export const unix_time = (): number => {
    const now = new Date();
    
    return (now.getTime() / 1000);
}