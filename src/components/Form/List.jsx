import React, { Component } from 'react';
import '../../assets/css/List.css'
import context from '../../store'

class List extends Component {
    static contextType=context
    state={
        users:this.context.users,
        checked:false,
        checkedList:[]
    }
    doubleFn(index,e){
        const td = e.target
        const inputEl = document.createElement('input')
        inputEl.value = this.state.users[index].username
        td.innerHTML = ''
        td.appendChild(inputEl)
        // 聚焦
        inputEl.focus()
        // 失去焦点事件
        inputEl.onblur = this.updateUsername.bind(this, index, td)
    }
    updateUsername(index,td,e){
        let users=(localStorage.getItem('users') && JSON.parse(localStorage.getItem('users'))) || []
        users[index].username=e.target.value
        localStorage.setItem('users',JSON.stringify(users));
        td.innerHTML=e.target.value
    }
    setFn(){

    }
    selectAllFn(e){
        if(e.target.checked){
            this.setState(state=>({
                checked:e.target.checked,
                checkedList:this.state.users.map(item=>item.username)
            }))
        }else{
            this.setState(state=>({
                checked:e.target.checked,
                checkedList:[]
            }))
        }
    }
    deleteFn(index){
        let users=(localStorage.getItem('users') && JSON.parse(localStorage.getItem('users'))) || []
        users.splice(index,1);
        localStorage.setItem('users',JSON.stringify(users))
        window.location.reload()
    }
    deleteAllFn(){
        if(this.state.checkedList.length>0){
            if (window.confirm('您真的全部删除吗？')) {
                let users=[]
                localStorage.setItem('users',JSON.stringify(users))
                window.location.reload()
              }
        }
    }
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" checked={this.state.checked} onChange={this.selectAllFn.bind(this)}/>
                                <button id="delete" onClick={this.deleteAllFn.bind(this)}>全部删除</button>
                            </th>
                            <th>用户名称</th>
                            <th>归属部门</th>
                            <th>手机号码</th>
                            <th>邮箱</th>
                            <th>登录账号</th>
                            <th>登录密码</th>
                            <th>用户性别</th>
                            <th>用户状态</th>
                            <th>岗位</th>
                            <th>角色</th>
                            <th>备注</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.length>0
                            ?
                            this.state.users.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" checked={this.state.checkedList.includes(item.username)} onChange={this.setFn.bind(this)} />
                                        </td>
                                        <td onDoubleClick={this.doubleFn.bind(this,index)}>{item.username}</td>
                                        <td>{item.depname}</td>
                                        <td>{item.tel}</td>
                                        <td>{item.email}</td>
                                        <td>{item.id}</td>
                                        <td>{item.password}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.states?'正常':'不正常'}</td>
                                        <td>{item.post}</td>
                                        <td>{item.role}</td>
                                        <td>{item.remarks}</td>
                                        <td onClick={this.deleteFn.bind(this,index)}>删除</td>
                                    </tr>
                                )
                            })
                            :
                            <tr><td>暂无数据</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;
