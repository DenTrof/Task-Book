import React from 'react';
import axios from 'axios';
import $ from 'jquery';


export default class HomePage extends React.Component {

    state = {
        items: [],
        totalTaskCount: '',
        pagination: '1',
        sort: 'username',
        //-------- data for preview ----------//
        username: '',
        email: '',
        text: '',
        image: ''
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

    /*----------------- Add data on backend  ---------------------------------*/
    handleSubmit = (event) => {
        event.preventDefault();
        $(document).ready(function () {
            const forMData = document.querySelector('#form1');
            var form = new FormData(forMData);

            $.ajax({
                url: 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=denis.trofanchuk',
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
            location.reload();
        });
    };

    paginationId = (e) => {
        const id = e.target.id;
        this.setState({
            pagination: id
        });

         /*----------------- Make pagination data ---------------------------------*/
         const sort = this.state.sort;
         axios.get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=denis.trofanchuk&page=${id}&sort_field=${sort}`)
             .then(res => {
                 const items = res.data.message.tasks;
                 const pagination = res.data.message.total_task_count;
                 this.setState({
                     items: items,
                     totalTaskCount: pagination
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
                const pagination = res.data.message.total_task_count;
                this.setState({
                    items: items,
                    totalTaskCount: pagination
                });
            });
    }

    /*----------------- Add form data in state ---------------------------------*/
    handleChange = (type) => event => {
        const { value } = event.target;
        this.setState({
            [type]: value,
        });
    }

    /*----------------- Open/close preview ---------------------------------*/
    hidden = (e) => {
        e.preventDefault();
        const hidden = document.querySelector('.none');
        hidden.classList.toggle("hidden");
    }

    render() {
        /*----------------- Pagination logic ---------------------------------*/
        const total_task = this.state.totalTaskCount;
        const division = Math.ceil(total_task / 3);
        const totalArr = [];
        for (var i = 0; i < division; i++)
            totalArr.push(i + 1)

        /*----------------- Read file URL ---------------------------------*/
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#blah').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#imgInp").change(function () {
            readURL(this);
        });

        return (
            <div>
                <div className="img-list-container">
                    <div>
                        Add task
                <form id="form1" runat="server" onSubmit={this.handleSubmit} method="POST" action="" encType="multipart/form-data" accept="image/jpg, image/gif, image/png">
                            <input type="text" name="username" placeholder="User name *" onChange={this.handleChange('username')} required />
                            <input type="email" name="email" placeholder="Emaile *" onChange={this.handleChange('email')} required />
                            <textarea name="text" placeholder="Text" onChange={this.handleChange('text')} required />
                            <input id="imgInp" type="file" name="image" placeholder="Image_path *" onChange={this.handleChange('image')} required />
                            <br />
                            <button type="submit" >Add</button>
                            <button onClick={this.hidden}>Preview</button>
                        </form>

                        <div className='item-container'>
                            <div className="img-list">
                                {
                                    <div className='none'>
                                        <img id="blah" src="#" alt="preview image" />
                                        <div className='item-name'>Name: {this.state.username}</div>
                                        <div className='item-name'>Email: {this.state.email}</div>
                                        <div className='item-name'>Status: 0</div>
                                        <div className='item-description'>Description: {this.state.text}</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
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
                                </div>
                            )}
                        </div>
                        <ul className="pagination">
                            {totalArr.map(item =>
                                <li onClick={this.paginationId} key={item} id={`${item}`} >{item}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}