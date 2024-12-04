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
    `views` int NOT NULL DEFAULT 0,
    `viewNumber` int DEFAULT 0,
    `videoTitle` TEXT DEFAULT NULL,
    `likeNumber` int DEFAULT 0,
    `videoDescription` TEXT DEFAULT NULL,
    `videoDate` datetime DEFAULT CURRENT_TIMESTAMP,
    `type` varchar(10) DEFAULT NULL,
    PRIMARY KEY (`vid`),
    FOREIGN KEY (`uid`) REFERENCES `User` (`uid`)
);

CREATE TABLE `Comment`(
    `cid` int NOT NULL AUTO_INCREMENT,
    `vid` int default NULL,
    `uid` varchar(12) NOT NULL,
    `postid` int default NULL,
    `content` TEXT DEFAULT NULL,
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
    `postText` TEXT DEFAULT NULL,
    `postLike` int DEFAULT 0 ,
    `postComment` TEXT DEFAULT NULL,
    `uploadTime` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`postid`),
    FOREIGN KEY (`uid`) REFERENCES `User` (`uid`)
);