/* ProFluencer Awards — data layer (demo build: localStorage).
   Production swaps the PFA.store internals with the PHP/MySQL API;
   page code keeps calling the same PFA.* functions. */
(function () {
  'use strict';

  var DB_KEY = 'pfa_db_v2', SESSION_KEY = 'pfa_session_v2',
      ADMIN_KEY = 'pfa_admin_v2', VOTER_KEY = 'pfa_voter_v2', OTP_KEY = 'pfa_otp_v2';

  var CATEGORIES = [
    { id: 'fashion', name: 'Fashion and Beauty',
      tagline: 'Style icons setting the trends',
      desc: 'Fashion, styling, cosmetics and skincare creators whose looks move culture.',
      img: 'assets/img/cat-fashion.jpg' },
    { id: 'lifestyle', name: 'Lifestyle and Entertainment',
      tagline: 'The ones who keep us watching',
      desc: 'Lifestyle, comedy, music, gaming and general entertainment creators.',
      img: 'assets/img/cat-entertainment.jpg' },
    { id: 'travel', name: 'Travel and Hospitality',
      tagline: 'Storytellers of extraordinary places',
      desc: 'Destinations, hotels, tourism and travel experiences, beautifully documented.',
      img: 'assets/img/cat-travel.jpg' },
    { id: 'food', name: 'Food and Dining',
      tagline: 'Taste-makers of the region',
      desc: 'Restaurants, recipes, chefs and honest food reviews.',
      img: 'assets/img/cat-food.jpg' },
    { id: 'fitness', name: 'Health, Fitness and Wellness',
      tagline: 'Coaches building stronger lives',
      desc: 'Fitness, sport, wellbeing and healthy living, backed by real results.',
      img: 'assets/img/cat-fitness.jpg' },
    { id: 'business', name: 'Business and Entrepreneurship',
      tagline: 'Builders of what is next',
      desc: 'Entrepreneurship, leadership, marketing and career growth voices.',
      img: 'assets/img/cat-business.jpg' },
    { id: 'finance', name: 'Finance, Trading and Crypto',
      tagline: 'Minds moving money smartly',
      desc: 'Personal finance, investing, forex, trading and crypto education.',
      img: 'assets/img/cat-finance.jpg' },
    { id: 'tech', name: 'Technology and Innovation',
      tagline: 'Voices decoding tomorrow',
      desc: 'Gadgets, software, AI and technology education for everyone.',
      img: 'assets/img/cat-tech.jpg' },
    { id: 'realestate', name: 'Real Estate and Home',
      tagline: 'Curators of exceptional spaces',
      desc: 'Property, interiors, architecture and home improvement experts.',
      img: 'assets/img/cat-realestate.jpg' },
    { id: 'education', name: 'Education, Parenting and Family',
      tagline: 'Teachers of the internet age',
      desc: 'Learning, parenting, family and children\u2019s education creators.',
      img: 'assets/img/cat-education.jpg' }
  ];

  function defaultSettings() {
    return {
      edition: 'ProFluencer Awards 2026',
      votingStart: '2026-10-15T00:00:00+04:00',
      votingEnd: '2026-11-30T23:59:59+04:00',
      ceremony: '2026-12-11T15:00:00+04:00',
      ceremonyVenue: 'Dubai, UAE — venue announced soon',
      resultsPublished: false,
      snapshot: null,
      snapshotVersion: 0,
      termsVersion: 'v1.0 — Sep 2026'
    };
  }

  /* [catId, displayName, handle, platform, votes, followers, bio, country, city] */
  var SEED = [
    ['fashion','Amira Khan','@amirakhan.style','Instagram',3421,'1.2M','Modest fashion stylist turning everyday looks into statements.','UAE','Dubai'],
    ['fashion','Layla Haddad','@layla.haddad','TikTok',2874,'980K','Beauty creator famous for 60-second glow-up transformations.','UAE','Abu Dhabi'],
    ['fashion','Sofia Reyes','@sofiareyes.glam','YouTube',1932,'760K','Luxury unboxings and honest designer reviews, weekly.','Spain','Dubai'],
    ['fashion','Omar Farouk','@omarfarouk.men','Instagram',1204,'540K','Menswear minimalism with a Middle Eastern twist.','Egypt','Dubai'],
    ['fashion','Priya Nair','@priyanair.beauty','TikTok',866,'410K','Skincare science made simple for busy routines.','India','Sharjah'],
    ['lifestyle','Faisal Ahmed','@funnyfaisal','TikTok',3567,'1.6M','Sketch comedy on expat life in the Gulf.','Pakistan','Dubai'],
    ['lifestyle','Lina Omar','@lololaughs','Instagram',2901,'1.1M','Relatable reels on family, food and beautiful chaos.','UAE','Dubai'],
    ['lifestyle','Ryan DSouza','@thedubaidude','YouTube',2134,'800K','Pranks, challenges and feel-good vlogs.','India','Dubai'],
    ['lifestyle','Mariam Nasser','@mariam.skits','TikTok',1567,'620K','Character comedy with a brand-new persona every week.','UAE','Ajman'],
    ['lifestyle','Kabir Shah','@kabircomedy','Instagram',1023,'430K','Stand-up clips and crowd-work gold.','India','Dubai'],
    ['travel','Aisha Belhoul','@aishabelhoul.travels','Instagram',3254,'1.3M','Luxury escapes and cultural deep-dives, beautifully shot.','UAE','Dubai'],
    ['travel','Sam Whitfield','@wanderwithsam','YouTube',2765,'950K','Budget-to-luxury travel guides in cinematic 4K.','UK','Dubai'],
    ['travel','Noor Al Suwaidi','@nooralsuwaidi.luxe','TikTok',1988,'720K','48-hour city guides for the time-poor explorer.','UAE','Abu Dhabi'],
    ['travel','Elena Petrova','@elenapetrova.goes','Instagram',1423,'560K','Solo travel storytelling with safety-first honesty.','Russia','Dubai'],
    ['travel','Arjun Mehta','@arjunmehta.roams','YouTube',967,'390K','Road trips and mountain trails across Asia.','India','Dubai'],
    ['food','Ravi Kumar','@chefravi.kumar','Instagram',2988,'1.0M','Fine-dining chef revealing restaurant secrets at home.','India','Dubai'],
    ['food','Fatima Al Farsi','@fatimaalfarsi.eats','TikTok',2412,'840K','Hidden-gem hunter across the Emirates food scene.','UAE','Sharjah'],
    ['food','Marco Silva','@marcosilva.food','YouTube',1765,'690K','From street carts to Michelin stars, reviewed honestly.','Italy','Dubai'],
    ['food','Huda Karim','@hudakarim.kitchen','Instagram',1290,'480K','15-minute family recipes with Levantine soul.','Lebanon','Dubai'],
    ['food','Daniel Osei','@danielosei.tastes','TikTok',874,'350K','Dessert obsessive rating every viral sweet.','Ghana','Dubai'],
    ['fitness','Khalid Mansour','@khalidmansour.fit','Instagram',3102,'1.1M','Strength coach behind 90-day transformations that last.','UAE','Dubai'],
    ['fitness','Zara Ahmed','@zaraahmed.fit','TikTok',2654,'890K','Home workouts, zero excuses, real results.','Pakistan','Dubai'],
    ['fitness','Jake Morrison','@jakemorrison.train','YouTube',1876,'720K','Evidence-based training, no bro-science.','UK','Dubai'],
    ['fitness','Divya Menon','@divyamenon.yoga','Instagram',1345,'510K','Yoga flows for desk workers and new mothers.','India','Dubai'],
    ['fitness','Tariq Aziz','@tariqaziz.gym','TikTok',923,'380K','Street-workout athlete documenting the grind daily.','Pakistan','Sharjah'],
    ['business','Omar Khalidi','@omarkhalidi.startups','Instagram',2876,'1.0M','Startup mentor turning ideas into funded companies.','UAE','Dubai'],
    ['business','Sara Nasser','@saranasser.ceo','TikTok',2432,'870K','E-commerce founder sharing unfiltered business lessons.','UAE','Dubai'],
    ['business','Nadia Rahman','@nadiarahman.marketing','Instagram',1898,'700K','Marketing strategist for ambitious small brands.','UK','Dubai'],
    ['business','Vikram Rao','@vikramrao.ventures','YouTube',1354,'520K','Venture building and fundraising, explained clearly.','India','Dubai'],
    ['business','Tariq Mahmood','@tariqmahmood.scale','TikTok',912,'360K','Operations and scaling advice for growing teams.','Pakistan','Abu Dhabi'],
    ['finance','Faisal Merchant','@faisalmerchant.fx','Instagram',3120,'1.2M','Markets explained in plain language, every day.','UAE','Dubai'],
    ['finance','Anita Desai','@anitadesai.money','YouTube',2567,'900K','Personal finance for first-generation earners.','India','Dubai'],
    ['finance','Rania Khalil','@raniakhalil.biz','TikTok',1890,'710K','Startup stories and SME money lessons.','UAE','Dubai'],
    ['finance','James Carter','@jamescarter.trades','YouTube',1342,'520K','Risk-first trading education for beginners.','UK','Dubai'],
    ['finance','Lina Haddad','@linacrypto.dxb','Instagram',1045,'410K','Crypto concepts without the hype or jargon.','Lebanon','Dubai'],
    ['tech','Bilal Sheikh','@techwithbilal','YouTube',2890,'1.1M','Gadget reviews with zero sponsorship bias.','Pakistan','Dubai'],
    ['tech','Sara Iqbal','@saraiqbal.tech','Instagram',2345,'820K','Making AI and apps understandable for everyone.','UAE','Dubai'],
    ['tech','David Chen','@davidchen.gadgets','TikTok',1834,'700K','60-second tech tips you will actually use.','China','Dubai'],
    ['tech','Layla Rahman','@laylarahman.reviews','YouTube',1276,'490K','Deep-dive comparisons before you spend a dirham.','UAE','Sharjah'],
    ['tech','Omar Haddad','@omarhaddad.unbox','Instagram',845,'340K','Satisfying unboxings and dream setup tours.','UAE','Dubai'],
    ['realestate','Khalid Rahman','@khalidrahman.property','Instagram',2765,'990K','Dubai property tours, from studios to penthouses.','UAE','Dubai'],
    ['realestate','Mira Al Farsi','@miraalfarsi.interiors','TikTok',2312,'840K','Interior transformations on real budgets.','UAE','Abu Dhabi'],
    ['realestate','Adel Karim','@adelkarim.realty','YouTube',1876,'700K','Honest market analysis for buyers and investors.','Egypt','Dubai'],
    ['realestate','Sofia Nasser','@sofianasser.homes','Instagram',1298,'500K','Home styling that feels like a boutique hotel.','Lebanon','Dubai'],
    ['realestate','Omar Farid','@omarfarid.estates','TikTok',934,'370K','Off-plan explained simply, no sales talk.','UAE','Dubai'],
    ['education','Sana Sheikh','@drsanasheikh','Instagram',2765,'1.0M','Doctor breaking down health myths for families.','Pakistan','Dubai'],
    ['education','Karim Yusuf','@coachkarim','YouTube',2312,'860K','Career skills and interview mastery for youth.','UAE','Dubai'],
    ['education','Laila Hassan','@learnwithlaila','TikTok',1789,'680K','English made easy, one minute at a time.','Egypt','Sharjah'],
    ['education','Ahmed Raza','@profahmedraza','Instagram',1287,'500K','History threads that read like thrillers.','India','Dubai'],
    ['education','Mira Adel','@mindsetmira','YouTube',934,'360K','Psychology-backed productivity for students.','UAE','Dubai']
  ];

  function now() { return Date.now(); }

  function seedInfluencers() {
    var t = now();
    return SEED.map(function (s, i) {
      return {
        id: 'seed-' + i,
        categoryId: s[0], name: s[1], legalName: s[1], handle: s[2], platform: s[3],
        profileUrl: '', votes: s[4], followers: s[5], bio: s[6], country: s[7], city: s[8],
        email: '', mobile: '', photo: '',
        status: 'approved', approved: true, reviewNotes: '',
        marketingConsent: false, termsVersion: defaultSettings().termsVersion,
        createdAt: t - (60 - i) * 3600000,
        approvedAt: t - (59 - i) * 3600000,
        lastVoteAt: t - (50 - i) * 60000,
        updatedAt: t
      };
    });
  }

  function seed() {
    return {
      influencers: seedInfluencers(),
      votes: [], audit: [], rsvps: [], enquiries: [],
      settings: defaultSettings()
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(DB_KEY);
      if (raw) { var db = JSON.parse(raw); if (db && db.influencers && db.settings) return db; }
    } catch (e) {}
    var db = seed(); save(db); return db;
  }
  function save(db) { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) {} }

  function uid(p) { return (p || 'id') + '-' + now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function initials(name) {
    return String(name || '?').split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }
  function fmt(n) {
    n = Math.round(n);
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
    return String(n);
  }
  function hashStr(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(16);
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmtTime(ts) {
    var d = new Date(ts);
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }

  /* ranking: votes desc, then earliest lastVoteAt, then earliest approvedAt, then id */
  function rankSort(a, b) {
    if (b.votes !== a.votes) return b.votes - a.votes;
    if (a.lastVoteAt !== b.lastVoteAt) return a.lastVoteAt - b.lastVoteAt;
    if (a.approvedAt !== b.approvedAt) return a.approvedAt - b.approvedAt;
    return a.id < b.id ? -1 : 1;
  }

  var PFA = {
    CATEGORIES: CATEGORIES,

    settings: function () { return load().settings; },
    saveSettings: function (patch) {
      var db = load();
      for (var k in patch) db.settings[k] = patch[k];
      save(db); return db.settings;
    },

    votingState: function () {
      var s = PFA.settings(), t = now();
      if (t < new Date(s.votingStart).getTime()) return 'upcoming';
      if (t > new Date(s.votingEnd).getTime()) return 'closed';
      return 'open';
    },
    countdownTarget: function () { return PFA.settings().votingEnd; },

    category: function (id) {
      for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i];
      return null;
    },

    all: function () { return load().influencers.slice().sort(rankSort); },
    get: function (id) {
      var list = load().influencers;
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },
    approved: function () {
      return load().influencers.filter(function (x) { return x.status === 'approved'; }).sort(rankSort);
    },
    byCategory: function (catId, onlyApproved) {
      return load().influencers
        .filter(function (x) { return x.categoryId === catId && (!onlyApproved || x.status === 'approved'); })
        .sort(rankSort);
    },
    top5: function (catId) { return PFA.byCategory(catId, true).slice(0, 5); },
    approvedCount: function (catId) { return PFA.byCategory(catId, true).length; },

    stats: function (catId) {
      var list = PFA.byCategory(catId, true);
      return { count: list.length, total: list.reduce(function (s, x) { return s + x.votes; }, 0) };
    },
    pct: function (inf) {
      var t = PFA.stats(inf.categoryId).total;
      return t > 0 ? (inf.votes / t * 100) : 0;
    },
    rank: function (inf) {
      var list = PFA.byCategory(inf.categoryId, true);
      for (var i = 0; i < list.length; i++) if (list[i].id === inf.id) return i + 1;
      return -1;
    },

    /* ---------- nominations ---------- */
    nominate: function (d) {
      var db = load();
      var inf = {
        id: uid('inf'), categoryId: d.categoryId,
        name: d.displayName, legalName: d.legalName, handle: d.handle,
        platform: d.platform, profileUrl: d.profileUrl || '',
        email: d.email, mobile: d.mobile, country: d.country, city: d.city,
        followers: d.followers || '', bio: d.bio || '', photo: d.photo || '',
        votes: 0, status: 'submitted', approved: false, reviewNotes: '',
        password: d.password, marketingConsent: !!d.marketingConsent,
        termsVersion: db.settings.termsVersion,
        createdAt: now(), approvedAt: 0, lastVoteAt: 0, updatedAt: now()
      };
      db.influencers.push(inf);
      db.audit.push({ at: now(), actor: 'system', action: 'nomination_submitted', detail: inf.name + ' → ' + (PFA.category(inf.categoryId) || {}).name });
      save(db); PFA.setSession(inf.id);
      return inf;
    },

    setNominationStatus: function (id, status, notes) {
      var db = load(), found = null;
      for (var i = 0; i < db.influencers.length; i++) {
        if (db.influencers[i].id === id) {
          found = db.influencers[i];
          found.status = status;
          found.approved = (status === 'approved');
          found.reviewNotes = notes || '';
          if (status === 'approved' && !found.approvedAt) found.approvedAt = now();
          found.updatedAt = now();
          break;
        }
      }
      if (found) {
        db.audit.push({ at: now(), actor: 'admin', action: 'nomination_' + status, detail: found.name + (notes ? ' — ' + notes : '') });
        save(db);
      }
      return found;
    },

    login: function (email, password) {
      var list = load().influencers;
      email = (email || '').trim().toLowerCase();
      for (var i = 0; i < list.length; i++) {
        if ((list[i].email || '').toLowerCase() === email && list[i].password === password) {
          PFA.setSession(list[i].id); return list[i];
        }
      }
      return null;
    },
    session: function () {
      var id = null;
      try { id = localStorage.getItem(SESSION_KEY); } catch (e) {}
      return id ? PFA.get(id) : null;
    },
    setSession: function (id) { try { localStorage.setItem(SESSION_KEY, id); } catch (e) {} },
    clearSession: function () { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} },

    voteLink: function (id) {
      return location.origin + location.pathname.replace(/[^\/]*$/, '') + 'vote.html?id=' + encodeURIComponent(id);
    },

    /* ---------- voter verification (demo OTP; production: real SMS provider) ---------- */
    requestOtp: function (phone) {
      phone = String(phone || '').replace(/\D/g, '');
      if (phone.length < 7) return { ok: false, error: 'Enter a valid mobile number.' };
      var code = String(Math.floor(100000 + Math.random() * 900000));
      try {
        localStorage.setItem(OTP_KEY, JSON.stringify({ phone: phone, code: code, expires: now() + 5 * 60000, attempts: 0 }));
      } catch (e) {}
      return { ok: true, demoCode: code };
    },
    verifyOtp: function (phone, code) {
      var rec = null;
      try { rec = JSON.parse(localStorage.getItem(OTP_KEY) || 'null'); } catch (e) {}
      phone = String(phone || '').replace(/\D/g, '');
      if (!rec || rec.phone !== phone) return { ok: false, error: 'No code requested for this number.' };
      if (now() > rec.expires) return { ok: false, error: 'Code expired. Request a new one.' };
      rec.attempts++;
      try { localStorage.setItem(OTP_KEY, JSON.stringify(rec)); } catch (e) {}
      if (rec.attempts > 5) return { ok: false, error: 'Too many attempts. Request a new code.' };
      if (String(code).trim() !== rec.code) return { ok: false, error: 'Incorrect code. Try again.' };
      try {
        localStorage.setItem(VOTER_KEY, JSON.stringify({ voterHash: hashStr('pfa|' + phone), verifiedAt: now() }));
        localStorage.removeItem(OTP_KEY);
      } catch (e) {}
      return { ok: true };
    },
    currentVoter: function () {
      try { return JSON.parse(localStorage.getItem(VOTER_KEY) || 'null'); } catch (e) { return null; }
    },
    voterChoice: function (catId) {
      var v = PFA.currentVoter();
      if (!v) return null;
      var votes = load().votes;
      for (var i = votes.length - 1; i >= 0; i--) {
        if (votes[i].voterHash === v.voterHash && votes[i].categoryId === catId && votes[i].status === 'counted') {
          return votes[i].nomineeId;
        }
      }
      return null;
    },

    /* ---------- voting ---------- */
    vote: function (nomineeId) {
      var db = load(), s = db.settings, t = now();
      if (t < new Date(s.votingStart).getTime()) return { ok: false, code: 'VOTING_NOT_OPEN' };
      if (t > new Date(s.votingEnd).getTime()) return { ok: false, code: 'VOTING_CLOSED' };
      var voter = PFA.currentVoter();
      if (!voter) return { ok: false, code: 'VERIFICATION_REQUIRED' };
      var inf = null;
      for (var i = 0; i < db.influencers.length; i++) {
        if (db.influencers[i].id === nomineeId) { inf = db.influencers[i]; break; }
      }
      if (!inf || inf.status !== 'approved') return { ok: false, code: 'NOMINEE_INELIGIBLE' };
      for (var j = 0; j < db.votes.length; j++) {
        var v = db.votes[j];
        if (v.voterHash === voter.voterHash && v.categoryId === inf.categoryId && v.status === 'counted') {
          return { ok: false, code: 'ALREADY_VOTED' };
        }
      }
      var rec = {
        id: uid('vote'), nomineeId: inf.id, categoryId: inf.categoryId,
        voterHash: voter.voterHash, at: t, status: 'counted', reason: ''
      };
      db.votes.push(rec);
      inf.votes += 1; inf.lastVoteAt = t; inf.updatedAt = t;
      db.audit.push({ at: t, actor: 'voter', action: 'vote_counted', detail: inf.name + ' (' + inf.categoryId + ')' });
      save(db);
      return { ok: true, votes: inf.votes };
    },

    recentVotes: function (limit) {
      return load().votes.slice().sort(function (a, b) { return b.at - a.at; }).slice(0, limit || 50);
    },
    invalidateVote: function (voteId, reason) {
      var db = load(), found = null;
      for (var i = 0; i < db.votes.length; i++) {
        if (db.votes[i].id === voteId && db.votes[i].status === 'counted') { found = db.votes[i]; break; }
      }
      if (!found) return false;
      found.status = 'invalidated'; found.reason = reason || '';
      for (var j = 0; j < db.influencers.length; j++) {
        if (db.influencers[j].id === found.nomineeId) {
          db.influencers[j].votes = Math.max(0, db.influencers[j].votes - 1);
          db.influencers[j].updatedAt = now();
          break;
        }
      }
      db.audit.push({ at: now(), actor: 'admin', action: 'vote_invalidated', detail: voteId + ' — ' + (reason || 'no reason') });
      save(db); return true;
    },

    /* ---------- results ---------- */
    publishResults: function () {
      var db = load(), cats = {};
      CATEGORIES.forEach(function (c) {
        cats[c.id] = PFA.byCategory(c.id, true).slice(0, 5).map(function (x, i) {
          return { nomineeId: x.id, name: x.name, rank: i + 1, votes: x.votes, title: i === 0 ? 'Category Winner' : 'Top 5 Honouree' };
        });
      });
      db.settings.snapshotVersion += 1;
      db.settings.snapshot = { version: db.settings.snapshotVersion, at: now(), by: 'admin', categories: cats };
      db.settings.resultsPublished = true;
      db.audit.push({ at: now(), actor: 'admin', action: 'results_published', detail: 'snapshot v' + db.settings.snapshotVersion });
      save(db); return db.settings.snapshot;
    },
    unpublishResults: function () {
      var db = load();
      db.settings.resultsPublished = false;
      db.audit.push({ at: now(), actor: 'admin', action: 'results_unpublished', detail: '' });
      save(db);
    },

    /* ---------- event + comms ---------- */
    addRsvp: function (d) {
      var db = load();
      db.rsvps.push({ id: uid('rsvp'), name: d.name, email: d.email, mobile: d.mobile || '', guests: d.guests || 1, type: d.type || 'guest', at: now(), checkedIn: false });
      save(db);
    },
    addEnquiry: function (d) {
      var db = load();
      db.enquiries.push({ id: uid('enq'), name: d.name, email: d.email, subject: d.subject || '', message: d.message, at: now(), read: false });
      save(db);
    },
    markEnquiryRead: function (id) {
      var db = load();
      db.enquiries.forEach(function (e) { if (e.id === id) e.read = true; });
      save(db);
    },
    toggleCheckIn: function (id) {
      var db = load();
      db.rsvps.forEach(function (r) { if (r.id === id) r.checkedIn = !r.checkedIn; });
      save(db);
    },
    auditLog: function (limit) {
      return load().audit.slice().sort(function (a, b) { return b.at - a.at; }).slice(0, limit || 100);
    },

    /* ---------- admin gate (demo; production: server session + MFA) ---------- */
    adminLogin: function (u, p) {
      if (u === 'admin' && p === 'profluencer2026') {
        try { localStorage.setItem(ADMIN_KEY, '1'); } catch (e) {}
        return true;
      }
      return false;
    },
    isAdmin: function () { try { return localStorage.getItem(ADMIN_KEY) === '1'; } catch (e) { return false; } },
    adminLogout: function () { try { localStorage.removeItem(ADMIN_KEY); } catch (e) {} },

    uid: uid, initials: initials, fmt: fmt, fmtTime: fmtTime, hashStr: hashStr
  };

  window.PFA = PFA;
})();
