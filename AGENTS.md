<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Placement is a client-only authenticated route using shared QuestionCard and query-cache loaders, because placement saves account-owned stats.
- Save placement completion and the available starting level together in user_stats; derive home continuation and map access from that level so direct content additions remain data-driven.
- Scope placement skip storage to the account ID so one learner's dismissal cannot hide another learner's offer.
