module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false, // không cho phép chống
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // vÌ mỗi bài đăng có thể có nhiều bình luận
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: 'cascade', // Tự động xóa bài đăng no sẽ tự động xóa tất cả các nhận xét
        });
        Posts.hasMany(models.Likes, {
            onDelete: 'cascade',
        });
    };
    return Posts;
};
