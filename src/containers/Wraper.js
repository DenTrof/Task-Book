import React, {Component as ReactComponent} from 'react';
import axios from 'axios';

export default (OriginalComponent) => class WrappedComponent extends ReactComponent {
    // state = {
    //     pagination: '1'
    // }

    render() {
        return <OriginalComponent {...this.props} {...this.state}  Add = {this.Add}/>
    }

    Add (e) {
        e && e.preventDefault && e.preventDefault()
        const id = e.target.id;
        console.log(id)
        // this.setState({
        //     pagination: id
        // });

        const number = this.state.pagination;
        const sort = this.state.sort;
    axios.get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=denis.trofanchuk&page=${number}&sort_field=${sort}`)
        .then(res => {
            const items = res.data.message.tasks;
            const pagination = res.data.message.total_task_count;
            this.setState({
                items: items,
                totalTaskCount: pagination
            });

        });
    }
}





// import React, { Component } from 'react';

// export default function(ComposedComponent) {
//   return class Add extends Component {
//    /*----------------- Make data ---------------------------------*/
//    Add(){
//     const number = this.state.pagination;
//     const sort = this.state.sort;
//     axios.get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=denis.trofanchuk&page=${number}&sort_field=${sort}`)
//         .then(res => {
//             const items = res.data.message.tasks;
//             const pagination = res.data.message.total_task_count;
//             this.setState({
//                 items: items,
//                 totalTaskCount: pagination
//             });

//         });
//     }
//     render(){
//       return <ComposedComponent { ...this.props } />;
//     }
//   }
// }