import * as singleSpa from "single-spa";
import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

interface IPage {
  name: string;
  route: string;
}

const pages: IPage[] = [
  {
    name: "Home",
    route: "/home",
  },
  {
    name: "App1",
    route: "/app1",
  },
  {
    name: "App2",
    route: "/app2",
  },
];

function ResponsiveAppBar() {
  const handleClickMenuOptions = (route: string) => {
    singleSpa.navigateToUrl(route);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleClickMenuOptions(page.route)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
