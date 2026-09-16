---
title: "I made a time machine"
date: 2026-09-16
lastmod: 2026-09-16
description: "I built a CHIP-8 Emulator that runs 50-year-old games"
---

## Why?

It all started a year ago. I was obsessed with Zig, and I was sweating to find Zig-related stuff in the universe. One of the repos that was sitting still on my WSL2 instance back then was a CHIP-8 emulator written in… Zig, of course. I ran the emulator. It opened up. I searched for CHIP-8 ROMs, tried plenty of them. They worked. The emulator worked.

Fast-forward a year, I discovered a lot in this time. One of them being  “Zig is effectively dead”, which I’ll probably write more about later. In one sentence, I believe the lack of memory safety in the languages we use has cost us enough to realize you can’t trust humans, just like you don’t trust an LLM.

Apart from that, I started using Rust. I’m currently working on a few Rust-written personal projects, but as of today, I’m the director of them; not the labor force. I wanted to choose a project and write it myself. The project had to meet these conditions:

It had to finish fast. I didn’t want to spend a year on a “side-project”.
The output had to be meaningfully useful; the outcome mattered to me as much as the learning process as I was progressing through it.
It had to teach me a lot. It had to be dense in knowledge I don’t know well, so writing the code solely forces me to learn them.

I recalled that Zig-written emulator, searched a bit, and yeah; It was my project.

CHIP-8 is one of the interesting “programming languages”. Tiny enough to be finishable in a weekend, yet still teaches you numerous systems programming concepts: memory layout and addressing, bitwise operations (masking, shifting, XOR), fixed-width integer overflow and wraparound, byte-order/endianness, the fetch-decode-execute cycle every CPU runs, stack-based subroutine calls, and flat-array representations of multidimensional data. It’s… a lot to learn in a weekend.

## How I made Fortress

I decided to call my emulator “Fortress”. It didn’t have a name at the beginning. I came up with this name when I named the `struct` that was holding CHIP-8’s functionally and logic `fortress`.

My reference document was [this](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM), which had all the info a systems programmer needed to know to build the emulator. The problem was that… I wasn’t a systems programmer. Here’s what I didn’t know, and had to know to be able to even read and understand the document itself:

- What endianness even means, and why it matters when two bytes need to become one number
- Bitwise shift and mask operations; e.g., how AND/shift together let you pull one specific value out of a bigger number
- Binary addition, and how does an integer overflow even happen.
  Hardware doesn't compute “in place”. Registers get read, math happens elsewhere, results get written back, and only as much as fits. That’s why an overflow (hopefully) doesn’t result in UB.
- XOR as a drawing primitive. This one got me hard. It turned out that once you make enough compromises in the display (pixels are booleans), you gain some wild stuff. For example, XORing a sprite once will draw it; XOR it once again and it cleans it up. The coolest one, though, is that by checking whether a black pixel was white last frame, you can realize if a collision between two objects has happened. Pixel-accurate physics with zero engine overhead.
- How a 2D grid is really just a 1D array in a trench coat (index = y * width + x)
  And CHIP-8 sucks. Even a perfectly accurate emulator fails to run many games, simply because real CHIP-8 interpreters back in the 70s-80s didn’t adhere to one specification. One of the most famous examples is `8xy6 - SHR Vx {, Vy}`. This instruction shifts the value in the register `Vx` (where x is a variable itself, read from the opcode) to the right by one. What’s that `{, Vy}` doing there? Well…

> The `{, Vy}` notation is a compatibility marker for a historical fork: original RCA CHIP-8 `8xy6` shifted `Vx` right in place and ignored `Vy`, but later CHIP-48/SUPER-CHIP reinterpreted it as `Vx = Vy >> 1`, so docs write `SHR Vx {, Vy}` to show that `Vy` is optional depending on the interpreter.

## And it worked

I had to fix a few quite hard-to-spot bugs, hiding inside the deepest internals of the opcode interpreter itself. But when I launched it for the first time after the bug fixes, and loaded 1 Player Pong… I was like, “Say my name!” I made it. I built a bridge between games older than my father and the latest hardware. I made a time machine. A quite small one, but small doesn’t mean simple.

Is it something I use every day? Probably not. Was it worth making it? Definitely. I recommend everyone try this challenge, bare hands (LSP doesn’t count), as an exercise for not forgetting how to code, or to have a rewarding intro to systems programming.
If you want to try the emulator right now, jump into [here](https://1matin.github.io/fortress/) or clone and run the repo at `https://github.com/1matin/fortress.git` and run `cargo install —path .`, then launch it using `fortress …` in the terminal.

