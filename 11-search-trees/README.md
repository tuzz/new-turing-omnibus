## Search Trees

Chapter 11 is the first chapter on Data Structures.

I have implemented Search Trees using arrays and memory as described on page 70.
I have also implemented the two pseudocode algorithms (SEARCH and DEPTH) that
operate over Search Trees.

Things to note:

The ArrayTree and MemoryTree are concrete implementations of the abstract notion
of a Search Tree. They have the same interface and the same algorithms work on
either tree.

This has been achieved by first considering what the interface should be for a
Search Tree. Then, the algorithms are decoupled from the trees and only use the
public interface of the trees. I think this is an example of a
[Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern).
