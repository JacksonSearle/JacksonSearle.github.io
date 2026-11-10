---
title: Splitformer
order: 4
headline: A transformer that writes several words per step instead of one, for faster text generation.
summary: In December 2023 I changed a small language model to predict up to 10 tokens at once. It generated text about 9 times faster, at some cost in accuracy.
thumb: splitformer-results.jpg
thumbAlt: "Results table: generating 1, 2, 5 and 10 tokens per step, with generation time and test loss for each"
stack:
  - Python
  - PyTorch
  - Microsoft TorchScale
  - Slurm (BYU supercomputer)
code: https://github.com/JacksonSearle/splitformer
---

## The problem

Language models write one token (roughly one word) at a time. Each token needs a full pass through the model, so generating a long answer is slow no matter how fast the hardware is.

## The result

A modified transformer, built on Microsoft's TorchScale library, whose final layer predicts several tokens from each pass instead of one. I trained it in December 2023 on BYU's supercomputer and compared it with a standard transformer with the same layers, on the same data and the same training budget.

| Tokens per step | Time to generate text | Speedup | Test loss (lower is better) |
| --- | --- | --- | --- |
| 1 (standard transformer) | 2.04 s | 1× | 0.580 |
| 2 | 1.02 s | 2.0× | 0.617 |
| 5 | 0.43 s | 4.8× | 0.692 |
| 10 | 0.23 s | 8.9× | 0.737 |

Generation got close to proportionally faster with each extra token per step, and quality dropped gradually rather than falling apart. These were small models (8 layers, about 10 million parameters for the baseline). The wider output layer also adds parameters, up to about 43 million at 10 tokens per step. So this is an early result, not a production technique. Predicting several tokens at once has since become an active research direction, including Meta's 2024 work on multi-token prediction.

## How it works

1. **Widen the output.** A normal transformer ends in a layer that scores every word in the vocabulary for the next position. The splitformer's last layer scores the vocabulary for the next *k* positions at once.
2. **Train on all of them together.** During training, the model is graded on each of the *k* upcoming tokens, so it learns to plan a few words ahead.
3. **Generate in jumps.** At generation time, one pass produces *k* tokens, so a 100-token answer takes 10 passes instead of 100 when *k* is 10.
4. **Measure the trade-off.** Every version was trained for the same number of epochs and tested on the same held-out text, recording test loss, perplexity and generation time.
