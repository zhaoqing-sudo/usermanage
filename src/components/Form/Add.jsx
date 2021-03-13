import React, { Component } from 'react';
import { Switch,Button } from 'antd';
import 'antd/dist/antd.css';
import '../../assets/css/index.css';

class index extends Component {
    state={
        userDate:{
            username:'',
            depname:'',
            tel:'',
            email:'',
            id:'',
            password:'',
            gender:'男',
            states:false,
            post:'',
            role:[],
            remarks:''
        },
        roleDate:[{
            id:1,
            name:'部门经理'
        },{
            id:2,
            name:'普通角色'
        },{
            id:3,
            name:'ttt'
        },{
            id:4,
            name:'uuu'
        }],
        users:(localStorage.getItem('users') && JSON.parse(localStorage.getItem('users'))) || []
    }
    valueFn(e){
        const name=e.target.name
        this.setState(state=>({
            userDate:{
                ...state.userDate,
                [name]:e.target.value
            }
        }))
    }
    onChange(checked) {
        this.setState(state=>({
            userDate:{
                ...state.userDate,
                states:checked
            }
        }))
    }
    setvalueFn(e){
        const name=e.target.name
        if(e.target.checked){
            this.setState(state=>({
                userDate:{
                    ...state.userDate,
                    [name]:[...state.userDate.role,e.target.value]
                }
            }))
        }else{
            this.setState(state=>({
                userDate:{
                    ...state.userDate,
                    [name]:state.userDate.role.filter(item=>item!==e.target.value)
                }
            }))
        }
        
    }
    addUser(){
        let users=(localStorage.getItem('users')&&JSON.parse(localStorage.getItem('users')))||[]
        console.log(users);
        users.push(this.state.userDate)
        localStorage.setItem('users',JSON.stringify(users))
        this.setState(state=>({
            userDate:{
                username:'',
                depname:'',
                tel:'',
                email:'',
                id:'',
                password:'',
                gender:'男',
                states:false,
                post:'',
                role:[],
                remarks:''
            },
            users
        }))
        window.location.reload()
    }
    render() {
        return (
                <div className="app">
                    <h1>基本信息</h1>
                    <hr/>
                    <label>
                        用户名称：
                        <input type="text" name="username" value={this.state.userDate.username} onChange={this.valueFn.bind(this)}/>
                    </label>
                    <label>
                        归属部门：
                        <input type="text" name="depname" value={this.state.userDate.depname} onChange={this.valueFn.bind(this)}/>
                    </label>
                    <label>
                        手机号码：
                        <input type="text" name="tel" value={this.state.userDate.tel} onChange={this.valueFn.bind(this)}/>
                    </label>
                    <label>
                        邮箱：
                        <input type="text" name="email" value={this.state.userDate.email} onChange={this.valueFn.bind(this)}/>
                    </label>
                    <label>
                        登录账号：
                        <input type="text" name="id" value={this.state.userDate.id} onChange={this.valueFn.bind(this)}/>
                    </label>
                    <label>
                        登录密码：
                        <input type="password" name="password" value={this.state.userDate.password} onChange={this.valueFn.bind(this)}/>
                    </label>
                    <label>
                        用户性别：
                        <select name="gender"  onChange={this.valueFn.bind(this)}>
                            <option  value='男'>男</option>
                            <option  value='女'>女</option>
                        </select>
                    </label>
                    <label>
                        用户状态：
                        <Switch name="states"  onChange={this.onChange.bind(this)} />
                    </label>
                    <label>
                        岗位：
                        <input type="text" name="post" value={this.state.userDate.post} onChange={this.valueFn.bind(this)}/>
                    </label>
                    <label className="role">
                        角色：
                            {
                                this.state.roleDate.map(item=>{
                                    return(
                                        <div key={item.id}>
                                            <input type="checkbox" name="role" value={item.name} onChange={this.setvalueFn.bind(this)}/>
                                            <span>{item.name}</span>
                                        </div>
                                    )
                                })
                            }
                    </label>
                    <h1>其他信息</h1>
                    <hr/>
                    <label>
                        备注：
                        <textarea  name="remarks" value={this.state.userDate.remarks} onChange={this.valueFn.bind(this)}></textarea>
                    </label>
                    <div className="btn">
                        <Button type="primary" onClick={this.addUser.bind(this)}>保存</Button>
                    </div>
                </div>
        );
    }
}

export default index;
