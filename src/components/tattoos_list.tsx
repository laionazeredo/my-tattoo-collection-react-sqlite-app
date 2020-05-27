// my_tattoo_collection/src/components/tattoos_list.tsx

// Import deps
import React from 'react'

// Import components
import { TattoosListRow } from './tattoos_list_row'

// Import styles
import './../css/tattoos_list.css'

// Create interfaces
interface TattooUI {
  id: number;
  reference: string;
  title: string;
  wheniwant: string;
  desirelevel: string;
}

interface TattoosListUI {
  tattoos: TattooUI[];
  loading: boolean;
  handleTattooRemove: (id: number, title: string) => void;
}

// Create tattoosList component
export const TattoosList = (props: TattoosListUI) => {
  // Show loading message
  if (props.loading) return <p>Tattoos table is loading...</p>
  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />
            <th className="table-head-item">Title</th>
            <th className="table-head-item">Reference</th>
            <th className="table-head-item">When I want to Do</th>
            <th className="table-head-item">What is my desire level</th>
            <th className="table-head-item" />
          </tr>
        </thead>
        <tbody className="table-body">
          {props.tattoos.length > 0 ? (
            props.tattoos.map((tattoo: TattooUI, idx) => (
              <TattoosListRow
                key={tattoo.id}
                tattoo={tattoo}
                position={idx + 1}
                handleTattooRemove={props.handleTattooRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no tattoos to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}