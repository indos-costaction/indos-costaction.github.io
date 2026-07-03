---
title: WG3 - Automated Preprocessing Pipelines
---

## WG3: Automated Preprocessing Pipelines

Preprocessing is a critical step in preparing neuroimaging data for analysis, but
current practices are often *ad hoc* and poorly documented. Working Group 3 (WG3) 
aims to map out the body of established preprocessing procedures to enhance transparency,
reproducibility, and interoperability. Focusing initially on EEG and MEG, and drawing
on established MRI practice, the Group defines best practices and documentation
standards for preprocessing pipelines. The outcome is clearer, more reusable pipelines
that support consistent and trustworthy analyses across research sites.

WG3 is co-chaired by Oscar Esteban (HES-SO Valais-Wallis) and Guiomar Niso (Cajal
Institute CSIC).

Questions? See the [contact page](/contact) or write to the WG3 mailing list.

### Task forces

- **TF1 — Inventory of tools and workflows.** A taxonomy and survey of preprocessing
  tools and workflows across modalities. Led by Friedrich Carrle.
- **TF2 — Literature review on preprocessing and provenance.** A pre-registered
  systematic review of preprocessing practices and how they are reported.
- **TF3 — Training materials.** Preprocessing training resources for the community,
  led by Başak Esin Köktürk Güzel.

### Activities

#### Federated Journal Club

The **Federated Journal Club** is a trainee-oriented scientific reading activity
transversal across the three Task Forces of WG3.
Participants collaboratively read and critically annotate the neuroimaging literature
across nine imaging modalities plus a cross-modality methods category, specifically 
focusing on preprocessing.

#### Eligibility

The Journal Club is **open to all interested practitioners, independenly of their
geographical location, experience, career stage or INDoS membership**.
We especially encourage trainees, early-career researchers and participants from
[Inclusiveness Target Countries](/grants).
You do not need to be a registered INDoS member to take part.
A free GitHub account is required to claim and track papers
at [the Journal Club page](https://www.indos-costaction.eu/journal-club/).

#### How we are federating a Journal Club

We have curated a pool of **242 preprocessing papers** across nine imaging modalities
plus a **cross-modality methods** category, accessible at
[the Journal Club page](https://www.indos-costaction.eu/journal-club/).

1. **Create a free GitHub account** if you do not have one.
2. **Browse the pool and claim papers** from that list (maximum three papers
   under review by a single participant at any given time).
   Papers with three reviews will be pulled out from the pool, to ensure reviews
   do not concentrate in a small subset of papers.
3. **Get the paper**. The website provides URLs (to the DOI resolver).
   Should you not be able to access a paper, please contact us and
   we will send it to you.
3. **You have 12 days to read each paper you claim**. 
   Use a PDF annotation tool to leave inline comments.
   It is also encouraged that a large comment is made at the end
   of the paper, wrapping up the most relevant aspects of the paper and the
   participant's interpretation.
   Comments are expected to mark what the participant did not understand,
   what has been contested or superseded since publication,
   and what matters for the INDoS mission of standardized, reproducible,
   shareable neuroimaging data.
4. **Return the annotated PDF** files making sure all comments are
   correctly recorded.
5. **Reviews are checked against a transparent rubric** that drives a live leaderboard.

A few rules keep the pool flowing:

- You may hold **at most three papers at a time**.
- A paper stops accepting new claims once **five people** have claimed it, so that at
  least three completed reviews are expected.
- A paper is **complete once three people** have reviewed it. The club stays open
  until every paper has three reviews.
- If a paper is not for you, you can **withdraw it** at any time before the
  deadline. It simply goes back to the pool for someone else.
- **Partial reviews are not accepted.** If you cannot finish, withdraw the paper rather
  than submit an incomplete review.
- Submit the annotated PDF before the deadline and mark the assignment complete. An
  unmet deadline returns the paper to the pool automatically.

#### How to read a neuroimaging paper

The goal of reviewing a paper is to critically parse its content, and leave a trace
of notes/comments that allow someone else understand (i) what the paper is about,
(ii) strengths and weaknesses of the research, the approach and the text itself;
(iii) synthesise evidence in the future.

- **Triage first.** Read in this order: title, abstract, figures, methods overview,
  conclusions. Ask: what problem, what data, what processing pipeline, what claim?
- **Read the methods as a pipeline.** Most of these papers describe or evaluate a
  processing pipeline. For each stage, ask what it does, what it assumes, which
  parameters were chosen versus left at defaults, and how the result was evaluated.
- **Check reproducibility.** Is code, containerisation, or versioning available?
  Could you re-run it? Does it use or extend community standards such as BIDS?
- **Mark what matters.** Strengths worth carrying forward, weaknesses, and what you
  would do differently. Honest "I did not understand this" notes are valuable, not a
  weakness — they are the single most useful signal for building training materials.

#### How to review a paper as a Journal Club participant

Your review is the paper's **PDF with inline annotations**. Please follow these
rules — they make reviews comparable, gradable, and usable for the final
publication:

- **No AI.** Do not use AI tools to read, summarise, or annotate the papers. The
  point of the club is your own learning and judgement. Reviews produced with AI
  defeat that purpose and will not score.
- **Annotate inside the PDF.** Use the comment/annotation tool of your PDF reader
  (Acrobat, Preview, Okular, the Zotero reader, and similar) to attach comments to
  the exact passages they refer to.
- **Typed comments only.** Annotations must be **digital text comments**. Scanned or
  photographed **handwritten notes are not accepted** — they cannot be read by the
  synthesis tooling or graded.
- **Anchor and spread your comments.** Annotate across the whole paper (methods and
  results), not just the introduction, and point to the exact step or claim.
- **Cover the three angles.** In your comments, mark (1) what you did not understand,
  (2) what has been contested, corrected, or superseded since publication, and
  (3) what is important for the Action (data sharing, standardization,
  reproducibility).
- **Confirm the no-AI declaration** when you submit.

Your **annotated PDF files are submitted to a private store** visible only to the
organisers. The materials later used in the final publication are the extracted,
de-identified annotation dataset and methodology, never the copyrighted PDFs.

#### Grading and the leaderboard

Each completed review is scored by the organisers against a transparent rubric, with
human spot-checks. The rubric rewards:

- **Engagement** — comments spread across the whole paper.
- **Comprehension** — specific, located "what I did not understand" notes.
- **Critical appraisal** — contesting claims and flagging superseded or corrected work.
- **Relevance to the Action** — the data-sharing, standardization, and
  reproducibility angle.
- **Originality** — your own voice and judgement.

> To grade fairly at the scale of hundreds of reviews and refresh the leaderboard
> daily, the organisers use AI assistance to score annotation quality against the
> rubric, calibrated by human checks. This is the one asymmetry in the club:
> **organisers may use AI to grade; participants may not use AI to review.**

The **leaderboard refreshes daily** and ranks participants by cumulative quality
points, so finishing more good reviews moves you up. Withdrawals and incomplete reviews
earn nothing. The standing in **early August** (date to be confirmed) is a major
input to the Training School invitations.
