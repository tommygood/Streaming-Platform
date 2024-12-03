create database s3;
use s3;
CREATE TABLE `User` (
    `uid` varchar(12) NOT NULL,
    `name` varchar(20) DEFAULT NULL,
    `age` int(3) DEFAULT NULL,
    `gender` tinyint(1) DEFAULT NULL,
    `birthday` date DEFAULT NULL,
    PRIMARY KEY (`uid`)
);

CREATE TABLE `Video`(
    `vid` int NOT NULL AUTO_INCREMENT,
    `uid` varchar(12) NOT NULL,
    `views` int NOT NULL,
    `viewNumber` int DEFAULT 0,
    `videoTitle` varchar(20) DEFAULT NULL,
    `likeNumber` int DEFAULT 0,
    `videoDesciption` varchar(255) DEFAULT NULL,
    `videoDate` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`vid`),
    FOREIGN KEY (`uid`) REFERENCES `User` (`uid`)
);

CREATE TABLE `Comment`(
    `cid` int NOT NULL AUTO_INCREMENT,
    `vid` int default NULL,
    `uid` varchar(12) NOT NULL,
    `postid` int default NULL,
    `content` varchar(255) DEFAULT NULL,
    `commentDate` datetime DEFAULT CURRENT_TIMESTAMP,
    `commentLike` int DEFAULT 0,
    PRIMARY KEY (`cid`),
    FOREIGN KEY (`vid`) REFERENCES `Video` (`vid`),
    FOREIGN KEY (`uid`) REFERENCES `User` (`uid`),
    FOREIGN KEY (`postid`) REFERENCES `Post` (`postid`)
);

CREATE TABLE `Post`(
    `postid` int NOT NULL AUTO_INCREMENT,
    `uid` varchar(12) NOT NULL,
    `postText` varchar(255) DEFAULT NULL,
    `postLike` int DEFAULT 0 ,
    `postComment` varchar(255) DEFAULT NULL,
    `uploadTime` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`postid`),
    FOREIGN KEY (`uid`) REFERENCES `User` (`uid`)
);