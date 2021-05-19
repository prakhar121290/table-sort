import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';

export default function DataTable() {

    const rowStyle = (row) => {
        if(row.assetClass === "Equities"){
            return { backgroundColor: "Cyan"}
        }
        else if(row.assetClass === "Credit"){
            return { backgroundColor: "Green"}
        }
        else if(row.assetClass === "Macro"){
            return {backgroundColor: "White"}
        }
    };

    const columns = [
        {dataField:'ticker', text:'Ticker', sort: true},
        {dataField:'price', text:'Price', sort: true, 
            style : (cell) => 
            { if(cell.price > 0){
                    console.log("priceeeee",cell.price);
                    return {color:"Blue"}
                }
                else{
                    return {color:"Red"}
                }
            }
        },
        {dataField:'assetClass', text:'AssetClass', sort: true}
    ]

    const [tableData, setTableData] = useState([]);
  
    useEffect(() => {
      fetch('./sampleData.json')
        .then(response => response.json())
        .then(res => setTableData(res))
        .catch(function(err){
            console.log("error", err);
        })
    },[]);
    
    return(
        <div>
            <BootstrapTable 
                bootstrap4 
                keyField="ticker" 
                columns={columns} 
                data={tableData} 
                rowStyle={rowStyle}
            />
        </div>
        // <table>
        //         <tr>
        //             <th>Ticker</th> 
        //             <th>Price</th>
        //             <th>AssetClass</th>
        //         </tr>
        //         {
        //             tableData && tableData.length > 0 ?
        //                 tableData.map(tbldata => 
        //                     <tr>
        //                         <td>{tbldata.ticker}</td>
        //                         <td style={{ color: tbldata.price > 0 ? "green" : "red" }}>{tbldata.price}</td>
        //                         <td>{tbldata.assetClass}</td>
        //                     </tr>
        //                 )
        //                 : 'Data is loading'
        //         }
        // </table>
    )

}