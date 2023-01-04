import Rea
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function Account(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style} component="form">
              {!isLogin ?
              <>
                <TextField
                  id="outlined-name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="outlined-uncontrolled"
                  label="Cover URL"
                  sx={{ mb: 2 }}
                  onChange={(e) => setURL(e.target.value)}
                  value={url}
                />
                <TextField
                  id="outlined-uncontrolled"
                  label="Video URL"
                  sx={{ mb: 2 }}
                  onChange={(e) => setVideo(e.target.value)}
                  value={video}
                />
                <Button variant="outlined" onClick={() => createHandler(name, url, video)}>Create</Button>
              </>
              :
              <>
              
              </>
             }
            </Box>
          </Fade>
        </Modal>
    )
} 