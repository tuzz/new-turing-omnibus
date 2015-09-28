module DepthAlgorithm
  def self.depth(tree, x, &block)
    yield x

    if tree.left(x) != nil
      depth(tree, tree.left(x), &block)
    end

    if tree.right(x) != nil
      depth(tree, tree.right(x), &block)
    end
  end
end
