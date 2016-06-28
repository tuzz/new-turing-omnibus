class Hanoi
  attr_accessor :output

  def initialize
    self.output = []
  end

  def solve(disks, desired_peg)
    peg_of_base_disk = disks.first

    if disks.length == 1
      output.push("Moving disk on peg #{peg_of_base_disk} to peg #{desired_peg}")
      [desired_peg]
    else
      spare_peg = ([0, 1, 2] - [peg_of_base_disk, desired_peg]).first

      # Solve for n - 1 smaller disks
      smaller_disks = solve(disks[1..-1], spare_peg)

      output.push("Moving disk on peg #{peg_of_base_disk} to peg #{desired_peg}")
      peg_of_base_disk = desired_peg

      # Solve for n - 1 smaller disks
      smaller_disks = solve(smaller_disks, desired_peg)

      # Return all of the disks
      [peg_of_base_disk] + smaller_disks
    end
  end
end
