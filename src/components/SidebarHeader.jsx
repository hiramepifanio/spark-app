import './SidebarHeader.css'

export default function SidebarHeader({ children }) {
  return (
    <div className="sidebar-header">
      <span className='sidebar-header-content'>{children}</span>
    </div>
  )
}