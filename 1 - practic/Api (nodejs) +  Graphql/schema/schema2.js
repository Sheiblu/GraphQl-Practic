
// Use dumy Data

const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql;

var books = [
    { name: "Deyal", genre: "Politic", autherID: '1', id: '1' },
    { name: "Bigan Ar Asor", genre: "Sci-fi", autherID: '2', id: '2' },
    { name: "Ami Robin", genre: "Detactive", autherID: '3', id: '3' },
    { name: "Dhakai Tin Goyanda", genre: "Detactive", autherID: '3', id: '4' },
    { name: "Nata Nirbachon", genre: "Detactive", autherID: '3', id: '5' },
    { name: "Taka Khala", genre: "Detactive", autherID: '3', id: '6' },
    { name: "Ami Topu", genre: "Sci-fi", autherID: '2', id: '7' },

]

var authers = [
    { name: "Humail Ahamed", age: 63, id: '1' },
    { name: "Zafor Ikbal", age: 60, id: '2' },
    { name: "Rokib Hasan", age: 58, id: '3' }
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        auther: {
            type: AutherType,
            resolve(parents, args) {
                return _.find(authers, { id: parents.autherID })
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
                return _.filter(books, {autherID: parents.id})
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
                return _.find(books, { id: args.id })
            }

        },
        auther: {
            type: AutherType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return _.find(authers, { id: args.id })
            }
        },
        bookList: {
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                return books;
            }
        },
        autherList: {
            type: new GraphQLList(AutherType),
            resolve(parents, args) {
                return authers;
            }
        },
    },

})


module.exports = new GraphQLSchema({
    query: RootQuery
})