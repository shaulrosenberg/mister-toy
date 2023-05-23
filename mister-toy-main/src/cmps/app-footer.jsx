
export function AppFooter() {
    // const user = useSelector(storeState => storeState.loggedinUser)

    function getUserStyle(user) {
        if (!user) return
        return {
            backgroundColor: user.prefs.bgColor,
            color: user.prefs.color
        }
    }

    return (
        <footer className="app-footer full">
            <p>CoffeeRights Shaul Rosenberg</p>
        </footer>
    )
}