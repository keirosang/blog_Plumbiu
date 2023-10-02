'use client'
import { IconButton, Menu } from '@mui/material'
import React, { useState } from 'react'
import {
  Menu as MenuIcon,
  FirstPage,
  Article,
  GitHub,
  TravelExplore,
  People,
  Comment,
  Tag,
  Category,
} from '@mui/icons-material'
import Hr from '@/components/ui/Hr'
import ButtonListIcon from '../ui/Button/ListIcon'

const lists = [
  { text: '首页', link: '/', icon: <FirstPage /> },
  { text: '文章', link: '/article/1', icon: <Article /> },
  { text: '开源之旅', link: '/opensource', icon: <TravelExplore /> },
  { text: '朋友们', link: '/friends', icon: <People /> },
  { text: '留言板', link: '/comments', icon: <Comment /> },
  { text: '标签', link: '/tags', icon: <Tag /> },
  { text: '分类', link: '/categories', icon: <Category /> },
  { text: 'GitHub', link: 'https://github.com/Plumbiu/blog', icon: <GitHub /> },
]

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <div style={{ maxWidth: '100%', padding: '0 4px' }}>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClick={handleClose}
          sx={{
            '.css-6hp17o-MuiList-root-MuiMenu-list': {
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
        >
          {lists.map(({ text, link, icon }, index) => (
            <div key={text}>
              <ButtonListIcon
                blank={false}
                icon={icon}
                mw={36}
                py={10}
                text={text}
                link={link}
              />
              {index % 3 ? undefined : <Hr />}
            </div>
          ))}
        </Menu>
      </div>
    </>
  )
}

export default HeaderMenu
