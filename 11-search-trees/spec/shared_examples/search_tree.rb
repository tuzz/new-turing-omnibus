RSpec.shared_examples "a search tree" do
  describe "integration test for the example in the book" do
    before do
      node_37  = subject.create_node
      node_29  = subject.create_node
      node_51  = subject.create_node
      node_5   = subject.create_node
      node_m80 = subject.create_node
      node_6   = subject.create_node
      node_17  = subject.create_node
      node_42  = subject.create_node
      node_9   = subject.create_node

      subject.set_item(node_37, 37)
      subject.set_item(node_29, 29)
      subject.set_item(node_51, 51)
      subject.set_item(node_5, 5)
      subject.set_item(node_m80, -80)
      subject.set_item(node_6, 6)
      subject.set_item(node_17, 17)
      subject.set_item(node_42, 42)
      subject.set_item(node_9, 9)

      subject.set_left(node_37, node_29)
      subject.set_left(node_29, node_5)
      subject.set_left(node_51, node_m80)
      subject.set_left(node_6, node_42)

      subject.set_right(node_37, node_51)
      subject.set_right(node_51, node_6)
      subject.set_right(node_5, node_17)
      subject.set_right(node_6, node_9)

      subject.top = node_37
    end

    it "behaves as expected" do
      node_37 = subject.top
      expect(subject.item(node_37)).to eq(37)

      node_29 = subject.left(node_37)
      expect(subject.item(node_29)).to eq(29)

      node_51 = subject.right(node_37)
      expect(subject.item(node_51)).to eq(51)

      node_5 = subject.left(node_29)
      expect(subject.item(node_5)).to eq(5)

      node_m80 = subject.left(node_51)
      expect(subject.item(node_m80)).to eq(-80)

      node_6 = subject.right(node_51)
      expect(subject.item(node_6)).to eq(6)

      node_17 = subject.right(node_5)
      expect(subject.item(node_17)).to eq(17)

      node_42 = subject.left(node_6)
      expect(subject.item(node_42)).to eq(42)

      node_9 = subject.right(node_6)
      expect(subject.item(node_9)).to eq(9)
    end
  end

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
