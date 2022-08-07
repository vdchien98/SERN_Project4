module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        commentBody: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        PostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Comments;
};
