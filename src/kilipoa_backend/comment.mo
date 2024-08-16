actor Kilipoa {
    // Previous definitions...

    public func likeProposal(proposalId: Nat): async Bool {
        let indexOpt = proposals.indexesWhere((p) -> p.id == proposalId).head();
        switch (indexOpt) {
            case (?index) {
                proposals[index].likes += 1;
                return true;
            };
            case null {
                return false;
            };
        };
    }

    public func commentOnProposal(proposalId: Nat, userId: Principal, content: Text): async Bool {
        let indexOpt = proposals.indexesWhere((p) -> p.id == proposalId).head();
        switch (indexOpt) {
            case (?index) {
                let newComment: Comment = {
                    userId = userId;
                    content = content;
                    timestamp = Time.now();
                };
                proposals[index].comments := Array.append(proposals[index].comments, [newComment]);
                return true;
            };
            case null {
                return false;
            };
        };
    }
}
