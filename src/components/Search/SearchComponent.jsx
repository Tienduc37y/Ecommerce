import _ from 'lodash'
import { Form, Input } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { searchProductByName } from '@/services/product'
import ResultList from './ResultList'
import { useNavigate } from 'react-router-dom'
const { Search } = Input;
export default function SearchComponent(){
    const nav = useNavigate()
    const [listData, setListData] = useState([])
    useEffect(()=>{
        function closeSearchPopup(e){
            setListData([])
        }
        window.addEventListener('click', closeSearchPopup)

        return ()=>{
            window.removeEventListener('click', closeSearchPopup)
        }
    }, [])

    const onChange = useCallback(_.debounce(async (e)=>{
        let txt = e.target.value.trim()
        try {
            if(txt){
                let data = await searchProductByName(txt)
                data = data.data
                
                setListData(data)
            }
        } catch (error) {
            console.log(error);
        }
    }, 1000))
   
    let result = (
        listData.length > 0 ? <ResultList 
            listData = {listData}
            handleItemClick={(e)=>{
                e.stopPropagation()
                setListData([])
            }}

        /> : null
    )

    return (
        <Form
            name='searchTaskForm'
            style={{position: 'relative'}}
        >
            <div className="board-search">
                <Form.Item
                    onChange={onChange}
                    style={{marginBottom: 0, position: 'relative'}}
                >
                    <Search type="search" className="board-search-input" aria-label="Board Search" placeholder='Tìm kiếm ...' 
                        onSearch={(value)=>{
                            nav(`/tim?name=${value}`)
                        }}
                    />
                </Form.Item>
                <i className="fas fa-search search-icon" aria-hidden="true"></i>
            </div>
            {result}
        </Form>
    )
}