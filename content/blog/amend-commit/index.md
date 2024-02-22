---
title: Amend an old commit in git
date: "2024-02-22"
description: "Use git rebase to amend an old commit"
subject: ["git", "terminal"]
---

#### Premise

If you wanted to amend the latest commit, you would just do `git commit --amend` to already staged files.
But what if you want to ammend a commit that is not the latest one? Read on ...

#### git rebase, what's that?

Personally, I believe interactive rebase is the closest thing to time travel we got, because it lets you change history, commit history.
When you run something like `git rebase <commit-hash>`, you're telling git to move the entire commit history of your branch to that specific commit.
We'll use this idea to rewrite commit history.

### Interactive rebase

First of all we need to find list of commits in our history log, then decide which commit we want to edit. Let's say we run command `git log` and get following list of commits.

```
- fourth commit (HEAD->main)
- third commit
- second commit
- first commit
```

Now, we decide that we want to amend second commit. For that, we'll run the command `git rebase -i HEAD~3`. Here, `3` is the number of commits we want to go back from current HEAD.
This will open up an editor with all the commits back up to n number of commits from HEAD like following

```
pick f9f850b second commit
pick c2383b3 third commit
pick 0f7aa04 fourth commit
```

We can do lot of things from this editor, but for now, we'll only focus on editing the second commit. To do that, let's change `pick` of `second commit` to `edit`.

```
edit f9f850b second commit
pick c2383b3 third commit
pick 0f7aa04 fourth commit
```

Then save and close the editor. `:wq` in vim.

If you see the `git log` now, voila you've travelled to `second commit`. Now you can make all the changes you want in `second commit`! Kidding!!
You can add new things as much as you want, but if you happen to change something that is already present in `second commit` and the commits that come after it,
be ready to face the ripple effect of time travel - Conflict!

Assuming you've added your changes, now you need to stage the changes with `git add` command then with another command `git rebase --continue`. If everything went as expected,
you've successfully amended the `second commit`.

#### Pushing the changes

Since we've changed the commit history, there's mismatch of history between remote and our local copy. The only solution now is to replace the entire remote branche's history with the one
from our local copy. To do that, you might be tempted to use the command `git push origin <branch> -f`. But, Wait!

Let's say you and one of your colleague are working on the same branch. And, your colleague just added some new changes - `fifth commit`. You're not aware about it. You just changed the entire history
of the branch you both are currently working on and used the command `git push origin <branch> -f`. Since your local copy of the branch doesn't have `fifth commit` and you force pushed it to the remote, you
end up deleting all the work done by your colleague. To prevent this, you should use the command `git push origin <branch> --force-with-lease`. This command won't let you force push your changes if there's already
some commits in the remote.
