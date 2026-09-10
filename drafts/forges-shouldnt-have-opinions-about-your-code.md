---
title: "Forges Shouldn't Have Opinions About Your Code"
date: 2026-09-08
lastmod: 2026-09-08
description: "vibe-governance is more dangerous than vibe-coding for FOSS"
---

## The event



On August 27, 2026, Drew DeVault announced that he'll be banning AI-generated projects from his code forge, SourceHut. The initial announcement on their mailing list was more like an "it's settled, how to phrase it" rather than "what are your insights", despite the misleading framing of the post.

I was reading it until I saw Codeberg mentioned, and I was like:{{ "Oh shit! | "}}Here we go again. We'll lose FOSS if they win". When Codeberg also announced that they'll be banning Cryptocurrency-related projects, they cited SourceHut's earlier decision and DeVault's post. Both parties take notes from each other, and the notes aren't… healthy, to say the least.

## The move you're actually objecting to

"But it's their infra, their software, their service, so they ban whatever they want from it, idiot!", said an idiot to me. Sure. Nobody's disputing that they *can*, now that they've done it. The question is whether you should trust a "GitHub alternative" whose actual definition of what it hosts keeps moving underneath you, one vibe-vote at a time, with zero advance warning and zero acknowledgment that it happened before.

Here's SourceHut's shameful timeline, dates included:

- **2018-11-15**  Alpha opens to the public, advertised as a general-purpose FOSS forge. No asterisks, no "except for" list
- **2019-10-23**  "%%Customers first, investors never:::Read to me like "vibes first, professionality never"%%". Explicitly positioned against GitHub on values, not just features
- **2021-05-01**  builds.sr.ht becomes paid-only, explicitly citing "cryptocurrency mining attacks" as the reason. DeVault realized managing a public forge isn't as easy as he thought.
- **2022-10-31**  First category-based ban: all cryptocurrency and **blockchain** projects, citing fraud and environmental harm
- **2025-04-15**  Deploys Anubis: a proof-of-work anti-scraper tool. The exact mechanism DeVault spent years calling wasteful when crypto did it (more on it later)
- **2026-08-27**  Second category-based ban: all AI-generated and AI-assisted code. Linux itself is now openly discussed as potentially too compromised to be welcome as an upstream project

And Codeberg:

- **2019-01-01**  Launches publicly as a "safe and friendly home" for Open Source (again, no asterisks)
- **2022-11**     Opens its own "should we ban crypto" discussion, citing SourceHut's decision as the model 
- **2024-10-20**  First resource restriction ever: storage quotas, on a platform that had none 
- **2025-04**     Deploys Anubis too
- **2026-07-22**  Same day: bans cryptocurrency ("%%harms our reputation:::read: this way we look cooler%%") and bans code "mostly consisting" of AI

Read those top to bottom. Neither of these platforms was founded as "a selective community that hosts only the kind of FOSS its members currently approve of." Both were founded, advertised, and grew for years as general code forges for FOSS. The category exclusions didn't show up until later, they didn't show up once, and each one gets cited for the next one: SourceHut points at Codeberg, Codeberg points back at SourceHut, %%and the list of what's welcome here gets shorter every eighteen months or so.:::This sentence felt too heavy for me to write. I'm genuinely sad for developers who trusted them and... got this back.%%

That's the actual problem, and it's not a taste question. If you'd told me in 2019 "we're a boutique forge, curated to our community's current politics, subject to revision without notice", that was fine. Different pitch, different expectations, no complaint from me or any other sane person. But that's not what got pitched. What got pitched was an *alternative*, and thousands of people built repositories, communities, and reputations on top of that pitch in good faith. Now imagine you were one of the people who put a crypto project on Codeberg in 2020, or used AI assistance for your SourceHut-hosted project in 2025, built years of community around it, and then saw the headline on HN. Your work didn't get banned for what it was. It got banned for what the platform silently decided to become, several years after you signed up for something else entirely. Great power, in their hands, apparently comes with the right to _update_ the deal as they vibe and call it "community governance".

That's the actual thing wrong here. Not that they have opinions today, but that you can never know _what they'll have opinions about tomorrow_, and they'll never tell you in advance. A dependency that changes its terms whenever the wind turns isn't an alternative; it's a trap with a grace period. And people who suggest them out of good faith are... unaware, at best.

Since GitHub started its Copilotification, I had been hoping (to the literal meaning) that alternatives would show up and help developers move away from GitHub… until I saw the alternatives. Now I beg that GitHub fixes its issues so people stop migrating away. Because, it turned out that, we had a huge oversight over one of the most fundamental gifts GitHub gave to the world: Not having opinions about software. You're hosting proprietary software? Welcome! A Crypto project? Welcome! [Malware](https://github.com/endermanch/malwaredatabase)? Also welcome! AI Slop? Code is code I guess… Forges shouldn't have opinions about your code.

This benefit of GitHub has always been under the radar because "you haven't seen the worse world", a common sentence I say to people in developed countries nagging about everything.

This has happened to the Internet itself as well. There are certain types of content that aren't inherently illegal, but because a few powerful entities (e.g., Google, Cloudflare, etc.) don't _vibe_ with them, they can't be discovered by other people. And the argument that such people make — "Go host your code somewhere else" — is the same thing. If Codeberg becomes "the GitHub" in the future, all AI-assisted code and Crypto projects (and let's pray nothing more) will be forced out of the social network of FOSS. And that's terrifying to see how much power irresponsible and radical individuals have gained in our world. There are a handful of people that their taste determines if your Free and Open Source project gets 5 stars or 50k outside GitHub.

It's the same move every time: assume the worst individual case and let it stand in for the whole category. Assuming everyone who uses a blockchain is a scammer makes about as much sense as assuming everyone who uses knives is a murderer, and nobody's proposing we ban the sale of knives. Meanwhile, banks and card networks quietly take a 1-3.5% cut of every transaction that touches them, and that's just called "business".

## Bob and the loophole

Another concern of mine is about FOSS licenses. For example, Codeberg's primary software is Forgejo. They forked the MIT-licensed Gitea, attached politics and slogans to it, and said "[Ours is GPL](https://forgejo.org/faq/#is-forgejo-licensed-under-the-agpl-or-eupl)" ([archive.org](https://web.archive.org/web/20260906090601/https://forgejo.org/faq/#is-forgejo-licensed-under-the-agpl-or-eupl)). Now imagine this scenario: Bob hates GitHub. Bob has a legit Crypto project on Codeberg. The repo was using some amount of electricity and producing some amount of pollution. Bob gets banned from Codeberg. Bob self-hosts Forgejo on his own VPS. Let that sit in.

How is this better for the environment?

On Codeberg, the repo's hosting was shared with more repos. On self-hosted, one repo is using a whole VM. The blockchain's survival isn't tied to its source code being available or not, so **if** the blockchain is PoW (unlikely today) and **if** it is meaningfully popular (two heavy ifs), then the source code's carbon footprint is nothing compared to the footprint of the chain running itself. Therefore, the ban doesn't achieve anything. It just helps Codeberg look stronger, which helps them gain more money from misled people.

And the environmental premise itself is shakier than it sounds. Post-Merge, Ethereum validators can run on hardware in the Raspberry-Pi tier. Many other mainstream blockchains (Solana, most EVM-based chains, etc.) are PoS as well. So even before you get to the relocation argument, the thing they're banning (Cryptocurrencies as whole, while banks were implied as the alternative) is as idiotic as a ban can theoretically get.

And this guides us into two conclusions:

1. Either they're vibe-banning whole categories of FOSS for _artificial_ _vibe_-based reasons (community! opinions! humans! soviets, unite! vibes), which is much scarier than vibe-coding and artificial intelligence if they ever become mainstream.
2. Or they imply that their ban meaningfully affects projects' progress and visibility, which is **literally censorship** and the very counter-argument against the "Go host your code elsewhere".

They will eventually notice this loophole. They'll notice that the software their people spent time and money supporting is now being used in exactly the ways they oppose. Would you wonder if they relicense Forgejo and then call themselves heroes for saving the poor and the Earth? What OSI-approved license aligns with their ever-changing taste and vibes? Nothing. So there are three possibilities:

1. Stay silent because being sloganist, about "saving" the environment and free software, isn't as cheap as writing ToSes and Blog posts anymore.
2. Admit that their intent was "close" to FOSS, not exactly it. Then take the L, add it to FOSS, and call it "FLOSS".
3. Try lobbying inside OSI to get their baseless license accepted.

The best outcome is 4: They never get enough power or attention to reach this point. Otherwise, there's no way to get past this crisis without dealing irreversible damage to true Free Software. Forges shouldn't have opinions about your code.

Another concern of mine is about environmental consistency:

If you care this much about carbon emissions and the Earth, why did you accept all things that were present in your age and, suddenly, anything that came after those was only a threat to the Earth? Apart from that, do you know how much of FOSS is written in interpreted and JITed languages like Python, JS, PHP and others? Do you know how many more CPU cycles they use compared to Rust or C++ to do the same computation? If you care that much about the environment, why are you silent while people are burning trees by using Python instead of Rust? Banning non-AOT languages will surely be more effective in favor of the Earth compared to banning a few crypto research projects that aren't deployed anywhere. The logic is clear:

> We ban ... because ... consumes a lot of energy, compared to ..., to ... software and ... are ruining our infra.

Today, it is:

> We ban {AI-assisted} code because {AI} consumes a lot of energy, compared to {handwritten code}, to {produce} software and {AI scrapers} are ruining our infra.

But it can be easily rephrased this way as well:

> We ban {Python code} because {CPython} consumes a lot of energy, compared to {Rust}, to {run} software and {Python-written scrapers} are ruining our infra.

And it doesn't even end here. When ethics (read: vibes of a group of individuals) become the beacon, where will the boundary be? Is software that's produced on proprietary operating systems unethical as well? Is there any reason not to ban code produced on Windows or macOS because their parent companies have had a bad record in environmental and FOSS-related happenings?

## They already suck

DeVault claimed reform efforts like proof-of-stake were "[viciously blocked by those in power.](https://drewdevault.com/blog/Cryptocurrency-is-a-disaster/#:~:text=3-,Not,different
)" ([archive.org](https://web.archive.org/web/20260908120519/https://drewdevault.com/blog/Cryptocurrency-is-a-disaster/#:~:text=3-,Not,different))

Ethereum shipped its proof-of-stake migration in 2022, [cutting energy usage](https://ethereum.org/roadmap/merge#:~:text=The%20Merge%20was%20executed%20on%20September%2015%2C%202022%2E%20This%20completed%20Ethereum%27s%20transition%20to%20proof%2Dof%2Dstake%20consensus%2C%20officially%20deprecating%20proof%2Dof%2Dwork%20and%20reducing%20energy%20consumption%20by%20%7E99%2E95%25%2E) ([archive.org](https://web.archive.org/web/20260831225209/https://ethereum.org/roadmap/merge/#:~:text=The%20Merge%20was%20executed%20on%20September%2015%2C%202022%2E%20This%20completed%20Ethereum%27s%20transition%20to%20proof%2Dof%2Dstake%20consensus%2C%20officially%20deprecating%20proof%2Dof%2Dwork%20and%20reducing%20energy%20consumption%20by%20%7E99%2E95%25%2E)) by roughly 99.95%. Here's the scary part:

If I read this claim before the migration, I would say: "{{Damn|Dude}}! He's right!" Now it's like a 12-year-old writing an essay about "How crypto stole $10k from my dad". For what they say, the boundary between reasonable and literal {{bullshit|false info}} is this thin. How can we trust them once again?

It's important for people to know that %%these so-called "FOSS rescuers":::some of you might say "why do you keep mixing up Codeberg and Drew DeVault, and I have to say the amount of citations they do from each other makes it nearly impossible to separate them%% say this:

> What 'value' does solving fake math problems actually provide to anyone? {{It's all Bullshit!|}} ([Source](https://drewdevault.com/blog/Cryptocurrency-is-a-disaster/#:~:text=What%20%E2%80%9Cvalue%E2%80%9D%20does%20solving%20fake%20math%20problems%20actually%20provide%20to%20anyone%3F%20It%E2%80%99s%20all%20bullshit))

Then install Anubis and go-away on their services to prevent scrapers. In their viewpoint, using PoW to have a decentralized ledger that no amount of "rich guys" can take over is a waste of energy; but if they themselves use that exact PoW to keep their products alive, it's heroic. Their _business_ (notice the word choice) is literally scaring people away from GitHub, AI, Monopolies, big things in general, then selling their product or getting donations so they join the big ones as well, to the point that they can abuse their power to manipulate and censor FOSS to what they vibe with and tastes good to them.

## Process critique

Look at how Codeberg's AI ban actually got decided: The vote email subject was, literally, "Disallow vibe-coded projects", not "should we regulate AI use," not even "AI policy discussion," just the conclusion already baked into the subject line before anyone had cast a vote. That's not how you ask a question. That's how you tell people what the answer already is and let them rubber-stamp it.

Then came the part where the actual PRs implementing the ban got posted after the vote text was already frozen. Nobody got to see how the sausage would actually be made before they were asked to vote yes or no on making it. The Assembly Q&A that followed wasn't a discussion either; it was clarification on a decision that had already shipped. People who showed up in the PR thread afterward asking for actual clarity — what counts, where's the line — [got silenced and redirected out of there](https://news.ycombinator.com/item?id=49022630), which is a nice way of saying "we don't want this in writing where people can point back to it later."

And the definition itself is honestly smart if you wanna hold a pressure leverage over your community indefinitely, but logically… it's {{bullshit|fairly questionable}}. "Mostly AI-generated" is not a rule; it's a vibe wearing rule's mustache (if that makes sense). If your own community can't rule on your own policy's most obvious test case, the policy doesn't exist yet; it's reserving the right to act based on your taste without risking losing donors' money. Forges shouldn't have opinions about your code.

Although I missed the train to talk about Codeberg's _power dynamics campaign_ at that time, I managed to post this same argument in the mailing thread DeVault started before officially banning AI, addressed to himself:

> Banning by authorship (is it AI) is fighting an unwinnable battle, on principle. The philosophy of AI's existence is toward mimicking human output better; the better it gets, the worse any detector gets. So that's not a policy that ages fine; it's a policy that weakens every day... Look at the harms you actually listed: the builds.sr.ht outage, scraping load, unreviewed slop nobody's accountable for. None of these need you to know whether AI was involved. You can already detect and rate-limit all of them today, on conduct alone. That's the real line to draw: not "did AI touch this," but "is this behavior hurting the platform?"

Nobody engaged with it. Not a rebuttal, not a "here's why conduct-based enforcement doesn't work for us",  just silence, and then the ban shipped anyway, worded exactly the way it would've been worded if I and most other `-1`s never written a word. Classic decorative elections.

And funnily enough, DeVault himself **awkwardly** failed to state his own flawed policy. [Greg KH](https://lists.sr.ht/~sircmpwn/sr.ht-discuss/%3CDKSTMKM0ZD9N.2FTBDFREZH699@ddevault.org%3E#:~:text=My%20only,not%3F) (a Linux kernel maintainer, not a troll last time I checked) asked him point-blank whether Linux itself, which openly accepts LLM-found and LLM-fixed security patches under human review (thanks Linus), would be banned under this policy. DeVault's answer was that Linux "[sits pretty close to where we would want to draw the line.](https://lists.sr.ht/~sircmpwn/sr.ht-discuss/%3CDKSTMKM0ZD9N.2FTBDFREZH699@ddevault.org%3E#:~:text=sits%20pretty%20close%20to%20where%20we%20would%20want%20to%20draw%20the%20line%3A)"

Read that again. One more time.

One of the most consequential pieces of free software on the planet, and the guy writing the rule can't tell you which side it lands on. Forges shouldn't have opinions about your code.

## Gatekeeping vs Censorship

Another argument that people might take against this is that "they're just gatekeeping their platforms. Not everything legal is okay, and you can't force them to host what they don't vibe with." I'd say "gatekeeping" and "censorship" are quite close in real-world meaning. One of them is used in official announcements; the other one is used by people. An ISP blocking UDP because 90% of UDP traffic in the past week was illegal also uses the word "gatekeeping". It's literally the most satisfying word to drop in a text as the reason for _blocking a tool_. One might say, "but you can host your AI-assisted repo anywhere on the Internet". That's a misleading statement. If an ISP blocks UDP, then telling their technical customers: "there are a ton of other ISPs to pick if you want UDP that bad" -- UDP won't die. But if 10 ISPs in your region block UDP, that's not protecting users anymore; that's manipulation of the Internet's architecture.

And inside the actual SourceHut mailing list thread that produced the AI ban (the one I posted in myself), people were already asking for more. Not "is this too far," but "why stop here?" I mean, when vibes start ruling your world, why limit yourself? Anything touching surveillance, social media, telemetry, any code that uses a Monopoly's product (Google, etc.) **must** be banned as well. Games are the obvious next step, because they waste people's time. Censorship-circumvention tools like `sing-box` or `xray` %%must be banned too:::if they ever migrate%%, without considering that literally billions of people's access to the Internet depends on them. "No shut up bro, Julia used it to bypass her company's firewall and played DOOM." Also, why not ban FOSS Social Media clients as well? Social media is addictive, isn't it?

None of this is me inventing a scary future. This is the thoughts trail of what the people currently deciding what counts as Free Software were proposing to each other, in public, while the ink on the current ban was still wet. And such people love calling everyone fascists, because, again, living based on your {{balls|taste}} encourages you to do what makes {{%%them:::referring to the balls%%|you}} feel good.

And that's the actual mechanism. It's never "we've identified the one true line and we're stopping here." It's "we found a line, and drawing it felt good, so let's see how many more we can draw." Forges shouldn't have opinions about your code.

## "Conclusion"; I hope we get one soon

FOSS had a simple goal: providing free software for everyone, no strings attached. GitHub has had a pretty good reputation in adhering to the "no strings attached" part, but has lost ground in other places like reliability and AI-ification. The majority of alternatives to GitHub all claim to be a place for FOSS, but they're aggressively opinionated about "what is FOSS". Here's my genuine ask for the majority of software developers:

Many of us have been misled, fooled, manipulated. A group of suspiciously similar people told us: "GitHub is bad" therefore "use our alternative". We observed the first part and didn't challenge the rest of it. Now we're seeing signs of who these people really are. They may not be absolute villains. They may not be aware of what they're doing to software as a whole. Nonetheless, what they're currently doing — fragmenting FOSS, advocating made-up ideologies, putting the phrase "EU" everywhere to attract Europeans — is harming all of us. Please stop socially promoting these people or suggesting their products. And please stop donating your precious money and time to them. There are much more respectable FOSS projects looking for your contributions.

I hope that I don't look at this post next year and realize 3 new classes of software have been wiped out of the non-GitHub FOSS since today, and I hope GitHub becomes better so we have enough time to make a more suitable alternative to it; so we aren't forced to jump on whatever is out there right now.

Cheers! And remember:

Forges shouldn't have opinions about your code.

