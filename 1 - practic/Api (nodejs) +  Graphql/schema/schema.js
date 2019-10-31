// Use mlab 

const graphql = require('graphql');
const Book = require('../model/book');
const Auther = require('../model/auther');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        autherID: { type: GraphQLString },
        auther: {
            type: AutherType,
            resolve(parents, args) {
                return Auther.findById(parents.autherID);
            }
        }
    })
});

const AutherType = new GraphQLObjectType({
    name: 'Auther',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                return Book.find({autherID: parents.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Book.findById(args.id)
            }

        },
        auther: {
            type: AutherType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Auther.findById(args.id)
            }
        },
        bookList: {
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                return Book.find({})
            }
        },
        autherList: {
            type: new GraphQLList(AutherType),
            resolve(parents, args) {
                return Auther.find({})
            }
        },
    },

})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuther: {
            type: AutherType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parents, args) {
                let auther = new Auther({
                    name: args.name,
                    age: args.age
                });
                return auther.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                autherID: { type: GraphQLID }
            },
            resolve(parents, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    autherID: args.autherID
                });
                return book.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})