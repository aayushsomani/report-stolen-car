const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
//Models
const { Case, Officer } = require("../../models/Case")

// @route POST reports/register
// @desc  Register new Case
// @access public
router.post("/register", (req, res) => {
    const newCaseObj = req.body
    const { registration_id, color, type } = req.body
    if (!registration_id || !color || !type)
        return res.status(200).json({ status: false, msg: "Please enter all fields" })
    const newCase = new Case({ registration_id, color, type })
    newCase.save(err => {
        if (err)
            return res.status(400).json({ status: false })
        Officer.findOneAndUpdate({ status: 'Off Duty' }, { case_assigned: mongoose.Types.ObjectId(newCase._id), status: 'On Duty' }, { new: true },
            (err, officer) => {
                if (officer) {
                    Case.findOneAndUpdate({ _id: newCase._id }, { status: "Pending", officer_assigned: mongoose.Types.ObjectId(officer._id) }, { new: true },
                        (err, doc) => {
                            if (doc)
                                Case.find({}).populate('officer_assigned')
                                    .exec((err, docs) => {
                                        res.status(200).json({ reportsData: docs, status: true })
                                    })
                        })
                }
                else {
                    Case.find({}).populate('officer_assigned')
                        .exec((err, docs) => {
                            res.status(200).json({ reportsData: docs, status: true })
                        });
                }
            })
    })
})


// @route POST reports/resolve
// @desc  Resolve existing Case and assign officer to unresolved case
// @access public
router.post("/resolve", (req, res) => {
    const _id = req.body._id
    Case.findOneAndUpdate({ _id }, { status: "Resolved", officer_assigned: [] },
        (err, doc) => {
            Officer.findOneAndUpdate({ _id: doc.officer_assigned[0]._id }, { status: "Off Duty", case_assigned: [] },
                (err, officer) => {
                    if (officer) {
                        Case.findOneAndUpdate({ status: "Not Assigned" }, { status: "Pending", officer_assigned: mongoose.Types.ObjectId(officer._id) }, { new: true },
                            (err, vCase) => {
                                if (vCase) {
                                    Officer.findOneAndUpdate({ _id: officer._id }, { status: "On Duty", case_assigned: mongoose.Types.ObjectId(vCase._id) },
                                        (err, vOff) => {
                                            Case.find({}).populate('officer_assigned')
                                                .exec((err, docs) => {
                                                    if (err)
                                                        res.status(404).json({ msg: "No result found" })
                                                    res.status(200).json({ reportsData: docs, status: true })
                                                });
                                        })
                                } else {
                                    Case.find({}).populate('officer_assigned')
                                        .exec((err, docs) => {
                                            if (err)
                                                res.status(404).json({ msg: "No result found" })
                                            res.status(200).json({ reportsData: docs, status: true })
                                        });

                                }
                            })
                    } else {
                        Case.find({}).populate('officer_assigned')
                            .exec((err, docs) => {
                                if (err)
                                    res.status(404).json({ msg: "No result found" })
                                res.status(200).json({ reportsData: docs, status: true })
                            });
                    }
                })
        })
})

// @route POST reports/getAll
// @desc  get all reports
// @access public
router.post("/getAll", (req, res) => {
    Case.find({}).populate('officer_assigned')
        .exec((err, docs) => {
            if (err)
                res.status(404).json({ msg: "No result found" })
            res.status(200).json({ reportsData: docs, status: true })
        });
})

// @route POST reports/addOfficer
// @desc  Register new Officer, default it is on Off Duty
// @access public
router.post("/addOfficer", (req, res) => {
    const newOfficer = new Officer(req.body);
    newOfficer.save().then(() => {
        res.status(200).json(newOfficer)
    })
})

module.exports = router;
