import friends from '~/config/friends.json'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const Friends = () => {
  return (
    <div
      style={{
        padding: '20px 42px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
      }}
    >
      {friends.map(({ link, name, avatar, desc }) => (
        <Card
          key={name}
          sx={{
            maxWidth: '20%',
            transition: 'all .15s',
            textAlign: 'center',
            mx: 'auto',
            my: '20px',
            '&:hover': {
              scale: '1.05',
              translate: '0 -5px',
            },
          }}
        >
          <CardMedia
            component="img"
            width="60%"
            image={'/friends/' + avatar}
            alt="green iguana"
          />
          <CardContent
            component="a"
            target="_blank"
            href={link}
            sx={{
              transition: 'all 0.2s',
              '&:hover': {
                color: '#9C27B0',
              },
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Friends
