import React from 'react'
import { Input, Button, Checkbox, Tooltip, Select, Form} from 'antd';

const { Option } = Select;


const SearchForm: React.FC = () => {

    const handleOnSortChange = () => {
        console.log(1)
    }

    return (
        <Form style={{marginBottom: 16}}>
            <Form.Item
                name="sortBy"
            >
                <div style={{display: 'flex', maxWidth: 400, alignItems: 'center', margin: '0 auto'}}>
                    <label style={{minWidth: 130}} htmlFor="sortBy">Сортировать по:</label>
                    <Select id="sortBy" onSelect={handleOnSortChange}>
                        <Option value="popularity.desc" >Популярности (уб.)</Option>
                        <Option value="popularity.asc">Популярности (возр.)</Option>
                        <Option value="vote_average.desc" >Рейтингу (уб.)</Option>
                        <Option value="vote_average.asc">Рейтингу (возр.)</Option>
                        <Option value="release_date.desc">Новизне (уб.)</Option>
                        <Option value="release_date.asc">Новизне (возр.)</Option>
                    </Select>
                </div>
            </Form.Item>
        </Form>
    )
}

export default SearchForm;