---
title: "Reflection 2: The Categories of Threats to Information Security"
slug: "information-security-threats"
date: "2026-08-08"
course: "CIT.017 - A"
tags: ["Threats", "Social Engineering", "Human Factor"]
summary: "Why most threats to a system are not attackers at all, and why the person holding the credentials is the part I keep forgetting to secure."
---

When I hear the word threat, my brain immediately goes to someone typing furiously in
a dark room trying to break into a database. Going through the twelve categories made
me realize how narrow that picture is. Only a handful of them involve a deliberate
attacker at all. Forces of nature, human error, technical hardware and software
failures, technological obsolescence, and deviations in quality of service can all
take a system down without a single malicious person being involved. Whether a server
goes offline because of a denial of service attack or because the power in the
building failed, the outcome for availability is identical, and the user does not care
about intent. That reframing was useful because I used to treat reliability and
security as two separate concerns, and the threat categories show they are the same
concern viewed from different angles.

The part that interested me the most was social engineering, and it genuinely changed
how I think about the whole subject. Social engineering does not attack the system, it
attacks the person connected to the system. Phishing, pretexting, and tailgating all
work by exploiting completely normal human instincts: the tendency to trust authority,
to react to urgency, to be helpful to someone who seems to belong. The realization
that hit me is that no matter how secured a system is technically, if one person with
access to it can be manipulated, everything behind that access is reachable. My
hashing, my role checks, and my parameterized queries all become irrelevant if someone
simply hands over their password to a convincing stranger. The attacker does not need
to defeat the lock if they can convince someone to open the door.

Applying this to my own work made it uncomfortably concrete. In the inventory system I
built, password resets are mediated by an administrator, which I originally considered
a security improvement because it removes the risk of a hijacked email reset link. But
looking at it through this lens, I created a social engineering surface with my own
hands. Anyone who can convince an administrator that they are a student who lost
access can get a credential handed to them, and my code would do nothing to stop it,
because from the system's perspective a legitimate admin performed a legitimate
action. I designed a control that shifts the attack from the software to a human
being, and I did not think of it that way at all while building it.

What I am taking from this is that a threat model listing only technical attacks is
incomplete by design. People are part of the system, so they belong in the threat
model alongside the servers and the database. Technical controls need procedural
support: verifying identity through a separate channel before granting access, and
making it acceptable to refuse an urgent request until it is confirmed. Least
Privilege also matters more to me now than it did last week, because if I assume
someone will eventually be fooled, the only thing limiting the damage is how little
that account could do in the first place. For my next project, my goal is to write
down not just how the system can be attacked, but who can be attacked to reach it.

