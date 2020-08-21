export const otherOrder = (collection, startIndex, endIndex) => {
    const result = [...collection];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

