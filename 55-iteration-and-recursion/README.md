##Iteration and Recursion

This is a quick example of solving the Towers of Hanoi problem recursively. This
implementation uses a single array to represent the peg positions of each disk.
Each element in the array represents peg the disk at that index is placed on.
The array uses the convention that disks are ordered in decreasing size with the
larges disk at index 0 of the array.

For example:

`[0, 0, 0]` means all three disks are on peg 0

`[2, 1]` means the largest disk is on peg 2 and the smallest disk is on 1
