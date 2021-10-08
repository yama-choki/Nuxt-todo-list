import firebase from '@/plugins/firebase'

export const state = () => ({
  todos: []
})

export const getters = {
  todos: (state) => {
    return state.todos
  }
}

export const actions = {
  getTodos ({ commit }) {
    firebase.firestore().collection('todos').orderBy('todo', 'asc').get()
      .then((res) => {
        const todos = []
        res.forEach((x) => {
          console.log(x.data())
          todos.push(x.data())
        })
        commit('getTodos', todos)
      })
  },
  submitTodo ({ dispatch }, todo) {
    firebase.firestore().collection('todos').add({}).then((res) => {
      firebase.firestore().collection('todos').doc(res.id)
        .set({
          todo,
          id: res.id
        }).then(() => {
          dispatch('getTodos', todo)
          // eslint-disable-next-line no-console
          console.log(todo, res.id)
        })
    })
  },
  deleteTodo ({ dispatch }, id) {
    firebase.firestore().collection('todos').doc(id).delete()
    dispatch('getTodos')
  }
}

export const mutations = {
  getTodos (state, todos) {
    state.todos = todos
  }
}
// import { firestoreAction } from 'vuexfire'
// import firebase from '~/plugins/firebase'

// const db = firebase.firestore()
// const todosRef = db.collection('todos')

// export const state = () => ({
//   todos: []
// })

// export const actions = {
//   init: firestoreAction(({ bindFirestoreRef }) => {
//     bindFirestoreRef('todos', todosRef)
//   }),
//   add: firestoreAction((context, name) => {
//     if (name.trim()) {
//       todosRef.add({
//         name,
//         done: false,
//         created: firebase.firestore.FieldValue.serverTimestamp()
//       })
//     }
//   }),
//   remove: firestoreAction((context, id) => {
//     todosRef.doc(id).delete()
//   }),
//   toggle: firestoreAction((context, todo) => {
//     todosRef.doc(todo.id).update({
//       done: !todo.done
//     })
//   })
// }

// export const getters = {
//   sortedTodos: (state) => {
//     const slicedTodos = state.todos.slice()
//     return slicedTodos.sort(function (a, b) {
//       if (a.created < b.created) {
//         return -1
//       } else {
//         return 1
//       }
//     })
//   }
// }
