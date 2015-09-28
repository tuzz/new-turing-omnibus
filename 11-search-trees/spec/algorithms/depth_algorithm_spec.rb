require "spec_helper"
require "shared_examples/depth_algorithm"

RSpec.describe DepthAlgorithm do
  context "when using an ArrayTree" do
    let(:tree_class) { ArrayTree }

    it_behaves_like "a depth algorithm"
  end

  context "when using a MemoryTree" do
    let(:tree_class) { MemoryTree }

    it_behaves_like "a depth algorithm"
  end
end
