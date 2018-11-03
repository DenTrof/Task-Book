import React from 'react';
import axios from 'axios';
import $ from 'jquery';



 
class Admin extends React.Component {

    state = {
        items: [],
        totalTaskCount: '',
        pagination: '1',
        sort: 'username',
        status: '',
        text: '',
        token: 'beejee',
        id: ''
    }

    componentDidMount() {
        
            /*----------------- Make data ---------------------------------*/
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

    handleClick = (e) => {
        const id = e.target.id;
        this.setState({
            pagination: id
        });
            /*----------------- Make pagination data ---------------------------------*/
            const sort = this.state.sort;
            axios.get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=denis.trofanchuk&page=${id}&sort_field=${sort}`)
                .then(res => {
                    const items = res.data.message.tasks;
                    this.setState({
                        items: items
                    });
                });
    }

    sortName = (e) => {
        const value = e.target.value;
        this.setState({
            sort: value
        });

        /*----------------- Make filter data ---------------------------------*/
        const namber = this.state.pagination;
        axios.get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=denis.trofanchuk&page=${namber}&sort_field=${value}`)
            .then(res => {
                const items = res.data.message.tasks;
                this.setState({
                    items: items
                });
            });
    }
    /*------------------------------------------ Edit form ---------------------------------------------------------*/
    handleSubmit = (event) => {
        event.preventDefault();
        const id = this.state.id;

        $(document).ready(function () {
            const forMData = document.querySelector(`.f${id}`);
            var form = new FormData(forMData);

            $.ajax({
                url: `https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=denis.trofanchuk`,
                crossDomain: true,
                method: 'POST',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                data: form,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                }
            });
        });
    };

    handleChange = (type) => event => {
        const { value } = event.target;
        this.setState({
            [type]: value,
        });
    }

    handleId = () => event => {
        const id = event.target.value;
        const hidd = document.querySelector(`.f${id}`);
        hidd.classList.toggle("hash_visible");
        this.setState({
            id
        });
    }

    handleStatus = e => {
        const id_checkbox = e.target.id;
        const checked_checkbox = document.querySelector(`.${id_checkbox}`);

        if (checked_checkbox.checked) {
            this.setState({
                status: '10'
            });
        } else {
            this.setState({
                status: '0'
            });
        }
    }

    render() {
       
        /*----------------- Pagination logic ---------------------------------*/
        const total_task = this.state.totalTaskCount;
        const division = Math.ceil(total_task / 3);
        const totalArr = [];
        for (var i = 0; i < division; i++)
            totalArr.push(i + 1)

        /*----------------- Assembly params_string --------------------------------------*/
        const status = this.state.status;
        const text = this.state.text;
        const status5 = encodeURIComponent(status)
        const text5 = encodeURIComponent(text)
        const paramsString = `status=${status5}&text=${text5}&token=beejee`;

        /*----------------- Сalculate md5(params_string) ---------------------------------*/
        const crypto = require('crypto');
        const hash = crypto.createHash('md5').update(paramsString).digest('hex');

        return (
            <div>
                <div className="img-list-container">
                    <div className="main-container">
                        <div className="select header-link"><select onChange={this.sortName}>
                            <option disabled selected>Выберите опцию</option>
                            <option value="username">Name</option>
                            <option value="email">Email</option>
                            <option value="status">Status</option>
                        </select>
                        </div>
                        <div className="img-list">
                            {this.state.items.map(item =>
                                <div className='item-container' key={item.id}>
                                    <div className="img-home" style={{ backgroundImage: `url(${item.image_path})` }}></div>
                                    <div className='item-name'>Name: {item.username}</div>
                                    <div className='item-name'>Email: {item.email}</div>
                                    <div className='item-name'>Status: {(item.status == '0') ? 'Task not completed' : 'Task completed'}</div>
                                    <div className='item-description'>Description: {item.text}</div>
                                    <div className='item-description'>Id: {item.id}</div>
                                    <form>
                                        <button className="start_add" id={`${item.id}`} onClick={this.handleId('id')} value={`${item.id}`}> Start editing </button>
                                        <lable className="completed">Completed  &nbsp;<input id={`ff${item.id}`} className={`ff${item.id}`} type="checkbox" onChange={this.handleStatus} /></lable>
                                    </form>
                                    <form className={`hash f${item.id}`} onSubmit={this.handleSubmit} method="POST" action="" encType="multipart/form-data" accept="image/jpg, image/gif, image/png">
                                        <input type="hidden" name="signature" placeholder="Signature *" value={`${hash}`} />
                                        <input type="hidden" name="status" value={`${status}`} />
                                        <textarea name="text" onChange={this.handleChange('text')} placeholder="Enter new task text *" required />
                                        <input type="hidden" name="token" placeholder="Token *" value={`${this.state.token}`} />
                                        <button type="submit" onClick={this.handleId('id')}  value={`${item.id}`}>Adit</button>
                                    </form>
                                </div>
                            )}

                        </div>
                        <ul className="pagination">
                            {totalArr.map(item =>
                                <li onClick={this.handleClick} key={item} id={`${item}`} >{item}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Admin;
