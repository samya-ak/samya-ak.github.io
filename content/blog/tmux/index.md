---
title: tmux
date: "2023-01-03"
description: "Get started with tmux"
subject: ["terminal", "tmux"]
---

### What's tmux?

tmux aka terminal multiplexer allows you to spawn multiple terminal sessions in a
single terminal window and switch between them seamlessly.

### Why should you use tmux?

- tmux keeps your terminal session running even when you close your terminal window, so you can pick up right where you left off when you login next time
- it allows you to split your terminal into multiple panes and windows (windows are basically collection of split panes)
- it is highly configurable and can be customized to suit your needs and preferences
- it allows remote pairing, meaning you can share a session with other users over a network - useful for remote pair programming and troubleshooting

### Some of the commands to get you started with tmux

Note: If you're interested in checking out my custom tmux configuration, its [here<img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/link.svg" width="20" height="20">](https://github.com/samya-ak/dotfiles/blob/master/.tmux.conf).
Shout out to [Josean.](https://youtu.be/U-omALWIBos)

```shell
# create a new session
tmux new -s <session name>

# exit the session
tmux detach

# list tmux sessions
tmux ls

# go back into specific session
tmux attach -t <session name>

# inside tmux session
# prefix is mapped from C-b to C-a

# see all active sessions
<prefix>s

# vertically split panes
<prefix>” ⇒ <prefix> |

# horizontally split panes
<prefix>% ⇒ <prefix> - 

# refresh the .tmux.conf file
<prefix>:source-file ~/.tmux.conf ⇒ <prefix> r

# resize panes
<prefix> j
<prefix> k
<prefix> h
<prefix> l

# plugin manager - tpm
# git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

# install plugins
<prefix> I

# after installing plugins, navigate between panes with
C-j, C-h, C-k, C-l

# create a new window
<prefix> c

# navigate to specific window using
<prefix> <window number you wanna navigate to>
# or
<prefix> n and <prefix> p to cycle through windows

# rename a window
<prefix> ,

# to view all of the windows
<prefix> w 

# toggle fullscreen pane
<prefix> z

# enable copy mode (to use vim motions)
# scrolling with mouse will automatically put you in copy mode
<prefix> [
C-u or C-d to move half page up/down
C-b or C-f to move full page up/down
# space key to start selecting text and enter to copy it to clipboard
# C-c to exit copy mode
```

