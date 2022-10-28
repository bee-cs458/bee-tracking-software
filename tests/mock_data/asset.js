// generate array with the specified size

export default (howMany) => Array(howMany).fill().map((_, index) => {
    return {
        asset_tag: index + 1,
        name: `Item foo #${index + 1}`,
        description: "Lorem ipsum dolor sit amet",
        date_added: new Date(Date.now() - index * 86400000),
        damage_notes: (index % 4 ? null : "It's broken"),
        category: index % 4,
        operational: !(index % 4) * 1,
        checked_out: 0,
        advanced: 0,
    };
})