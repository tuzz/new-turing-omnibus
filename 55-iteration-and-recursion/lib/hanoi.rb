def hanoi(disks, desired_peg, output = [])
  peg_of_base_disk = disks.first

  if disks.length == 1
    output += ["Moving disk on peg #{peg_of_base_disk} to peg #{desired_peg}"]
    [[desired_peg], output]
  else
    spare_peg = ([0, 1, 2] - [peg_of_base_disk, desired_peg]).first

    # Solve for n - 1 smaller disks
    smaller_disks, output = hanoi(disks[1..-1], spare_peg, output)

    output += ["Moving disk on peg #{peg_of_base_disk} to peg #{desired_peg}"]
    peg_of_base_disk = desired_peg

    # Solve for n - 1 smaller disks
    smaller_disks, output = hanoi(smaller_disks, desired_peg, output)

    # Return all of the disks
    [[peg_of_base_disk] + smaller_disks, output]
  end
end
