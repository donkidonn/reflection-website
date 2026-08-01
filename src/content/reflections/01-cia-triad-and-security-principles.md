---
title: "Reflection 1: The CIA Triad and Security Principles"
slug: "cia-triad-and-security-principles"
date: "2026-08-01"
course: "CIT.017 - A"
tags: ["CIA Triad", "Security Principles", "Fundamentals"]
summary: "What I learned about the three properties every secure system needs, and why security is a design constraint rather than a final checklist."
---

Before this topic, I thought security in a web application mostly meant hashing
passwords and keeping API keys out of the repository. Learning the CIA Triad reframed
that for me almost immediately. Security is not a feature you attach at the end of a
build. It is a set of properties that a system either has or does not have, and those
properties are decided long before deployment, back when you are still choosing how
data moves through the system.

Confidentiality means data is only readable by whoever is supposed to read it.
Integrity means data has not been altered, whether by an attacker or by an accident
in the code. Availability means the system is actually usable when people need it.
What clicked for me is that these three constantly pull against each other. The most
confidential system imaginable is one that nobody can access, but that completely
destroys availability. Encrypting and validating everything at every layer protects
integrity but adds latency that eventually becomes an availability problem too. So
every security decision is really a tradeoff between the three, and the correct
balance depends entirely on what the system is for. A hospital records system and a
public blog do not weigh them the same way.

Thinking back on the inventory system I built for our department, I realized I was
mostly protecting confidentiality through login and role checks, and barely thinking
about the other two at all. There was no audit trail to prove that records had not
been tampered with after submission, and no real answer for what happens if the
deployment goes down during a deadline. I was covering one third of the triad and
calling the whole thing secure, which is exactly the kind of blind spot this framework
is meant to expose.

The security principles gave me the practical vocabulary for the habits I had been
getting wrong. Least Privilege and the Need-to-Know Principle are the ones I violate
most often without noticing, because it is always easier to hand an account full
access than to sit down and define what it actually needs, and every unnecessary
permission simply widens the blast radius when that account is eventually compromised.
Defense in Depth changed how I think about controls, since no single layer is trusted
to be perfect. Client-side validation is convenience and not security, so server-side
validation, parameterized queries, and authorization checks now read to me as separate
independent layers that each assume the one above it already failed. Fail Safe, or
Secure by Default, is deceptively simple: when something breaks it should break closed
rather than open, meaning a permission check that throws an error must deny access
instead of skipping the check entirely. I have definitely written code that did the
opposite. Complete Mediation was the one I underestimated the most, because checking
permission once at login and caching that decision feels efficient right up until a
user's role changes in the middle of a session.

The remaining principles are less about individual lines of code and more about how
you approach the system as a whole. Economy of Mechanism and Open Design belong
together in my head now, since complexity is where bugs hide and real security should
come from the strength of the secret rather than from hoping nobody figures out how
your system works. Obscurity is not a control, it is only a delay. Separation of
Duties makes sure no single person can complete a sensitive action alone, which is a
process problem rather than a coding one, and Security by Design ties everything back
to the beginning by insisting that security requirements belong in the design phase
and not in a patch written after the demo.

The biggest shift for me is that I used to treat security as a checklist to satisfy
before deployment, and now I see it as a design constraint that shapes the
architecture from the very first decision. Retrofitting security into a finished
system is expensive and almost always incomplete, which is the entire point of
Security by Design. For my next project, my concrete goal is to write down which parts
of the CIA Triad matter most for that specific system before I write any code, and
then apply Least Privilege and Complete Mediation deliberately instead of accidentally.
