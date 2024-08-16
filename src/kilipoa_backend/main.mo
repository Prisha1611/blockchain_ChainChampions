import Nat "mo:base/Nat";
import Time "mo:base/Time";

actor Kilipoa {

    // Defining the types
    type Proposal = {
        id: Nat;
        title: Text;
        description: Text;
        imageUrl: Text;
        timestamp: Time.Time;
        votes: Nat;
        likes: Nat;
        comments: [Comment];
    };

    type Comment = {
        userId: Principal;
        content: Text;
        timestamp: Time.Time;
    };

    // Initializing the proposals array
    var proposals: [Proposal] = [];

    // Function to submit a proposal
    public func submitProposal(title: Text, description: Text, imageUrl: Text): async Nat {
        let id = Nat.fromInt(proposals.size() + 1);
        let newProposal: Proposal = {
            id = id;
            title = title;
            description = description;
            imageUrl = imageUrl;
            timestamp = Time.now();
            votes = 0;
            likes = 0;
            comments = [];
        };
        proposals := Array.append(proposals, [newProposal]);
        return id;
    }

    // Function to get all proposals
    public query func getProposals(): async [Proposal] {
        return proposals;
    }

    // Function to vote on a proposal
    public func voteOnProposal(proposalId: Nat): async Bool {
        let indexOpt = proposals.indexesWhere((p) -> p.id == proposalId).head();
        switch (indexOpt) {
            case (?index) {
                proposals[index].votes += 1;
                return true;
            };
            case null {
                return false;
            };
        };
    }

    // Function to like a proposal
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

    // Function to comment on a proposal
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
