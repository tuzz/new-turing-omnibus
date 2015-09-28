RSpec.shared_examples "a search tree" do
  describe "#create_node" do
    it "creates a node in the tree" do
      node = subject.create_node
      subject.top = node
      expect(subject.top).to eq(node)
    end
  end

  describe "#top" do
    it "returns nil when the tree is empty" do
      expect(subject.top).to be_nil
    end
  end

  describe "#item" do
    it "returns nil when there is no item" do
      node = subject.create_node
      expect(subject.item(node)).to eq(nil)
    end
  end

  describe "#set_item" do
    it "sets an item on the given node" do
      node = subject.create_node
      subject.set_item(node, "foo")

      expect(subject.item(node)).to eq("foo")
    end
  end

  describe "#left" do
    it "returns nil when there is no left node" do
      node = subject.create_node
      expect(subject.left(node)).to eq(nil)
    end
  end

  describe "#set_left" do
    it "set the left node of the given node" do
      node = subject.create_node
      left = subject.create_node
      subject.set_left(node, left)

      expect(subject.left(node)).to eq(left)
    end
  end

  describe "#right" do
    it "returns nil when there is no right node" do
      node = subject.create_node
      expect(subject.right(node)).to eq(nil)
    end
  end

  describe "#set_right" do
    it "set the right node of the given node" do
      node = subject.create_node
      right = subject.create_node
      subject.set_right(node, right)

      expect(subject.right(node)).to eq(right)
    end
  end
end
