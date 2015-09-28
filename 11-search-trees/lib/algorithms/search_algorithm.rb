# From pages 71, 72

module SearchAlgorithm
  def self.search(tree, item)
    found = false
    node = tree.top

    loop do
      if tree.item(node) == item
        puts "yes"
        node = nil
        found = true
      elsif tree.item(node) > item
        node = tree.left(node)
      elsif tree.item(node) < item
        node = tree.right(node)
      end

      break if node.nil?
    end

    puts "no" unless found
  end
end
