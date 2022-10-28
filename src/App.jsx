import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input, Space} from "antd";
import Highlighter from "react-highlight-words";
import { useState,useRef  } from "react";
import { SearchOutlined,EditOutlined, DeleteOutlined } from "@ant-design/icons";

import MyImage from './assets/react.svg';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingDamage, setEditingDamage] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
 
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [dataSource, setDataSource] = useState([{
    "id": 1,
    "damage_description": "Nulla tempus.",
    "date_of_damage": "2/19/2022",
    "first_Name": "Timothee",
    "license_Number": "855 207 5882",
    
  }, {
    "id": 2,
    "damage_description": "Donec vitae nisi.",
        "date_of_damage": "8/3/2022",
    "first_Name": "Benton",
    "license_Number": "897 272 1646"
  }, {
    "id": 3,
    "damage_description": "Suspendisse accumsan tortor quis turpis.",
       "date_of_damage": "9/29/2022",
    "first_Name": "Lea",
    "license_Number": "678 227 1105"
  }, {
    "id": 4,
    "damage_description": "Nunc rhoncus dui vel sem.",
        "date_of_damage": "1/26/2022",
    "first_Name": "Constance",
    "license_Number": "583 656 7796"
  }, {
    "id": 5,
    "damage_description": "Proin eu mi.",
      "date_of_damage": "11/28/2021",
    "first_Name": "Izaak",
    "license_Number": "257 856 9608"
  }, {
    "id": 6,
    "damage_description": "Integer tincidunt ante vel ipsum.",
    "date_of_damage": "11/14/2021",
    "first_Name": "Maximilianus",
    "license_Number": "812 490 7824"
  }, {
    "id": 7,
    "damage_description": "In hac habitasse platea dictumst.",
   "date_of_damage": "4/12/2022",
    "first_Name": "Wald",
    "license_Number": "380 979 5528"
  }, {
    "id": 8,
    "damage_description": "Phasellus in felis.",
       "date_of_damage": "1/23/2022",
    "first_Name": "Gabbi",
    "license_Number": "695 532 7422"
  }, {
    "id": 9,
    "damage_description": "Donec dapibus.",
      "date_of_damage": "11/16/2021",
    "first_Name": "Tiler",
    "license_Number": "802 823 6245"
  }, {
    "id": 10,
    "damage_description": "Integer ac neque.",
      "date_of_damage": "12/28/2021",
    "first_Name": "Eimile",
    "license_Number": "930 606 6580"
  }]
  );
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
     
      
    },
    {
      key: "2",
      title: "Damage Description",
      dataIndex: "damage_description",
      
      ...getColumnSearchProps('damage_description')
    },
   
    {
      key: "3",
      title: "license Number ",
      dataIndex: "license_Number",
     
      ...getColumnSearchProps('license_Number')
    },
    
   { key: "4",
    title: "date_of_damage",
    dataIndex: "date_of_damage",
   
    ...getColumnSearchProps('date_of_damage')
  },
  { key: "5",
  title: "Driver name",
  dataIndex: "first_Name",
 
  ...getColumnSearchProps('first_Name')
},  

 
 
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              style={{color:"green", }}
              onClick={() => {
                onEditDamage(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteDamage(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  
  const onDeleteDamage = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Damage record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((Damage) => Damage.id !== record.id);
        });
      },
    });
  };
  const onEditDamage = (record) => {
    setIsEditing(true);
    setEditingDamage({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingDamage(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Damage data"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((Damage) => {
                if (Damage.id === editingDamage.id) {
                  return editingDamage;
                } else {
                  return Damage;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingDamage?.damage_description}
            onChange={(e) => {
              setEditingDamage((pre) => {
                return { ...pre, damage_description: e.target.value };
              });
            }}
          />
          <Input
            value={editingDamage?.damage_level}
            onChange={(e) => {
              setEditingDamage((pre) => {
                return { ...pre, damage_level: e.target.value };
              });
            }}
          />
          <Input
            value={editingDamage?.license_Number_Number}
            onChange={(e) => {
              setEditingDamage((pre) => {
                return { ...pre, license_Number_Number: e.target.value };
              });
            }}
          />
         
          <Input
            value={editingDamage?.date_of_damage}
            onChange={(e) => {
              setEditingDamage((pre) => {
                return { ...pre, date_of_damage: e.target.value };
              });
            }}
          />
         
          

        </Modal>
      </header>
    </div>
  );
}

export default App;
