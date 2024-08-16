import Nat "mo:base/Nat";
import Time "mo:base/Time";

actor Kilipoa {
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

    var proposals: [Proposal] = [];

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

    public query func getProposals(): async [Proposal] {
        return proposals;
    }
}
