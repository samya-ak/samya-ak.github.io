---
title: Manage dotfiles using stow
date: "2024-02-20"
description: "Manage dotfiles using stow"
subject: ["terminal", "stow"]
---

#### The Problem

I've got my personal machine and work machine. They both share somewhat same dotfiles - configurations that allow me to programme seamlessly.
I've put these configurations in a git repo in ad hoc manner. Now when I have to setup my dev environment in new machine, I would clone this config repo
and manually move each config file to the directory it belongs to. So, there's always two copies of a config file in my machine (one in git repo and another
in directory where it actually supposed to be). And when I need to update a config file, I need to update in two places for a machine. This is painful!

#### The Solution: [Stow](https://github.com/aspiers/stow)

> Stow is a symlink farm manager program which takes distinct sets of software and/or data located in separate directories on the filesystem,
> and makes them all appear to be installed in a single directory tree.

You need perl to install stow. You can install perl using [perlbrew](https://perlbrew.pl/Installation.html).
You can install stow following guidelines from [here](https://github.com/aspiers/stow/blob/master/INSTALL.md) or if you're on mac, you can use homebrew.

```shell
sudo apt stow # Ubuntu

brew install stow # Homebrew Mac
```

#### Understanding directory structure

By default, target destination of the stowed files is parent directory of stow directory (current directory by default).
We can change target destination using following command

```shell
stow -t [target/path] [PACKAGE]
# stow -t ~ zsh
```

To make things simpler, let's place our `dotfiles` in `$HOME` directory.
We will treat every directory inside `dotfiles` as `$HOME` directory.
For example, `.zshrc` file resides in the path `~` i.e. home directory. So, you can directly put your `.zshrc` file in the directory let's say `dotfiles/zsh`.
And with the command `stow zsh`, a symlink to the `.zshrc` file is created at `~` directory.

Similarly, If you want symlink to be created at `~/.config/nvim`, you would create `nvim/.config/nvim` in dotfiles.

```shell
stow -D <packagename> # delete stowed package
stow -R <packagename> # restows package
stow -h # for more commands
```

Deleting stowed package doesn't delete the file but only removes the symlink.

#### Reference

- [dotfiles](https://github.com/samya-ak/dotfiles)
