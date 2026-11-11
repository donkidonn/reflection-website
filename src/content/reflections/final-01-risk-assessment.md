---
title: "Reflection 1: Risk Assessment and the Art of Deciding What to Worry About"
slug: "risk-assessment"
date: "2026-11-11"
term: "Final"
course: "CIT.017 - A"
tags: ["Risk Management", "Risk Assessment", "Risk Treatment"]
summary: "Why risk is not the same as threat, why the numbers in a risk matrix are judgments, and why choosing to accept a risk can be the responsible answer."
---

Before this module, I used the words threat and risk as if they meant the same thing.
Going through the risk management process showed me that a threat on its own tells you
almost nothing. A risk only exists when a threat meets a vulnerability in an asset that
actually matters, and that is why the process starts with identifying information
assets before it even mentions attackers. The book frames it as knowing yourself before
knowing the enemy. Drawing my own diagram of the process made this click, because I
had to place risk identification, risk analysis, and risk evaluation in order, and I
realized that every later step depends on how honestly the first one is done. If an
asset is missing from the inventory, its risks are invisible no matter how good the
rest of the analysis is.

The part I found most interesting was the formula itself, risk equals likelihood times
impact. It looks precise, but the more I worked with it, the more I saw that the
numbers are judgments rather than measurements. Deciding whether something is a 3 or a
4 for likelihood depends on evidence, experience, and sometimes just how well you
understand the system. The book even includes uncertainty as part of risk
determination, which I appreciated, because it admits that we rarely have perfect
knowledge of the future. What makes the scoring valuable is not that the numbers are
exact, but that they force you to compare risks against each other using the same
scale. Without that, every risk feels urgent, and when everything is urgent, nothing
really gets prioritized.

Risk evaluation and risk treatment changed how I think about security decisions. I
used to assume that the goal of security was to eliminate every risk, but the idea of
risk appetite showed me that organizations deliberately decide how much risk they can
live with. Anything below the threshold can be monitored, and anything above it needs
treatment. The four strategies, mitigation, transference, acceptance, and termination,
are not ranked from best to worst. Acceptance in particular surprised me, because it
sounds like giving up, but the book makes clear that it is only valid after a full
assessment and a cost-benefit analysis. Spending more on a control than the loss it
prevents is not security, it is waste. Even after treatment there is always residual
risk, so the goal is never zero, it is an acceptable level that someone has consciously
agreed to.

Applying this to my own projects was humbling. For the inventory system I built, I can
list its assets easily: the database, the user accounts, the source code, and the
server it runs on. But I never asked which of those risks were actually worth my time.
A database with no tested backup has a moderate likelihood of failure and a severe
impact, so it should have been near the top of my list, while some of the features I
spent hours securing protected data that barely mattered. I was treating every
concern with the same effort instead of letting likelihood and impact decide where my
effort should go.

What I am taking from this module is that risk assessment is less about predicting the
future and more about making decisions that can be explained. A ranked list of risks,
each with a reason and a chosen treatment, is something another person can review and
challenge, which is far better than relying on instinct. For my next project, I want
to write a small risk register before deployment, score each risk honestly, and decide
on purpose which ones to fix, which ones to transfer, and which ones I am willing to
accept.
