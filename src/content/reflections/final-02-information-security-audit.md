---
title: "Reflection 2: Auditing the Office That Runs Everything"
slug: "information-security-audit"
date: "2026-11-11"
term: "Final"
course: "CIT.017 - A"
tags: ["Security Audit", "Risk Assessment", "CIA Triad"]
summary: "What auditing CITS taught me about treating records as assets, rating risk honestly, and the shortcuts I take in my own projects."
---

When our group chose the Center for Information Technology Services (CITS) as the
subject of our information security audit, I thought I already knew the place. I had
built a system there during my internship, so I assumed the audit would mostly confirm
what I had seen. It turned out to be the opposite. Looking at CITS as an auditor
instead of as a developer made me notice how much of the university quietly depends on
one office: the LDAP directory that every account-based service signs in through, the
portal that holds student grades and payment status, the website, and the backup
appliance that everything is supposed to be recoverable from. Our group ended up with
24 information assets and 15 risk scenarios, and almost every one of them traced back
to something I had walked past without thinking about it.

My part of the project was the information asset inventory and its CIA classification,
along with describing and classifying the controls CITS already has. The inventory
changed my idea of what an asset even is. I expected servers and software, but some of
the most important entries were records: account directory entries, backup catalogs,
deployment definitions, even the duty roster. Losing or altering any of these would hit
many people at once, which is exactly what makes them valuable. Rating each asset
separately for confidentiality, integrity, and availability also taught me that the
three parts of the triad rarely agree. Published website content is Low for
confidentiality but High for integrity, because a defaced page is seen by the public
immediately. Splitting the rating forced me to say where an asset is actually weak
instead of calling everything important.

The hardest lesson came from our proctor's comments. One of them simply asked how our
classification scores were derived, and when I tried to answer it, I found that some
of my own ratings did not follow the rubric we had written. The account directory and
the payment status records should have been Very High for confidentiality by our own
definitions, and I had rated them High. Another comment pointed out that the same role
had three different names across our tables. None of these were dramatic errors, but
together they showed me that an audit report has to be checkable. Every rating should
trace back to a rule, and every claim should trace back to evidence. That also meant
being honest about the limits of what we knew. We worked from interviews and a
checklist, so we could not inspect configurations or test whether backups could
actually be restored, and I had to learn to write the difference between what CITS
confirmed, what we observed, and what we only estimated.

What stayed with me most is how familiar the findings felt. Changes going straight to
production without a staging environment, work files shared by link in a Messenger
group chat, one person being the only real responder when something breaks: these are
habits I have in my own projects, too. I deploy directly, I share documents the
fastest way possible, and I am usually the only person who knows how my systems are
set up. Seeing those same habits written down as findings with risk ratings beside
them made them feel less like shortcuts and more like decisions I am making on behalf
of whoever uses what I build.

What I am taking from this is the habit of looking at a system the way an auditor
does: list what is valuable, ask what could go wrong with it, and back every
conclusion with something a reader can verify. Security also turned out to be as much
about people and process as about technology, since clear account ownership, written
procedures, and a second trained responder matter as much as MFA does. For my next
project, I want to keep a small asset list and a staging environment from the start,
and write down who owns each account before I need to know.
