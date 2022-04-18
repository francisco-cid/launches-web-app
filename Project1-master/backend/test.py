import os
import sys
import unittest
try:
    from models import db, launches, launchers, agencies, serviced, made_by, used
except:
    from backend.models import db, launches, launchers, agencies, serviced, made_by, used

def test_func():
    unittest.main()

# -----------
# DBTestCases
# -----------
class DBTestCases(unittest.TestCase):
#     # ---------
#     # insertion
#     # ---------
#
    def test_launch_insert_1(self):
        s = launches(launch_id= 'test', launch_name='test-name', launcher_id=100000, launcher_name='test-launcher', agency_id=1000000, agency_name='test-agency')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(launches).filter_by(launch_id = 'test').one()
        self.assertEqual(str(r.launch_name), 'test-name')
        db.session.query(launches).filter_by(launch_id = 'test').delete()
        db.session.commit()

    def test_launch_insert_2(self):
        s = launches(launch_id= 'test1', launch_name='test-name1', launcher_id=100001, launcher_name='test-launcher1', agency_id=1000001, agency_name='test-agency1')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(launches).filter_by(launch_id = 'test1').one()
        self.assertEqual(str(r.launch_name), 'test-name1')
        db.session.query(launches).filter_by(launch_id = 'test1').delete()
        db.session.commit()

    def test_launch_count(self):
        count = db.session.query(launches).count()
        self.assertEqual(count, 1892)

    def test_launcher_insert_1(self):
        s = launchers(launcher_id=1000000, agency_id=1000000, launcher_name='test-name')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(launchers).filter_by(launcher_id = 1000000).one()
        self.assertEqual(str(r.launcher_name), 'test-name')
        db.session.query(launchers).filter_by(launcher_id = 1000000).delete()
        db.session.commit()

    def test_launcher_insert_2(self):
        s = launchers(launcher_id=1000001, agency_id=1000001, launcher_name='test-name1')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(launchers).filter_by(launcher_id = 1000001).one()
        self.assertEqual(str(r.launcher_name), 'test-name1')
        db.session.query(launchers).filter_by(launcher_id = 1000001).delete()
        db.session.commit()

    def test_launcher_count(self):
            count = db.session.query(launchers).count()
            self.assertEqual(count, 457)

    def test_agency_insert_1(self):
        s = agencies(agency_id=1000000, agency_name='test-name')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(agencies).filter_by(agency_id = 1000000).one()
        self.assertEqual(str(r.agency_name), 'test-name')
        db.session.query(agencies).filter_by(agency_id = 1000000).delete()
        db.session.commit()

    def test_agency_insert_2(self):
        s = agencies(agency_id=1000001, agency_name='test-name1')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(agencies).filter_by(agency_id = 1000001).one()
        self.assertEqual(str(r.agency_name), 'test-name1')
        db.session.query(agencies).filter_by(agency_id = 1000001).delete()
        db.session.commit()

    def test_agency_count(self):
        count = db.session.query(agencies).count()
        self.assertEqual(count, 268)

    def test_serviced_insert_1(self):
        s = serviced(launch_id='test', agency_id=1000000)
        db.session.add(s)
        db.session.commit()


        r = db.session.query(serviced).filter_by(launch_id = 'test').one()
        self.assertEqual(r.agency_id, 1000000)
        db.session.query(serviced).filter_by(launch_id = 'test').delete()
        db.session.commit()

    def test_serviced_insert_2(self):
        s = serviced(launch_id='test1', agency_id=1000001)
        db.session.add(s)
        db.session.commit()


        r = db.session.query(serviced).filter_by(launch_id = 'test1').one()
        self.assertEqual(r.agency_id, 1000001)
        db.session.query(serviced).filter_by(launch_id = 'test1').delete()
        db.session.commit()

    def test_serviced_count(self):
        count = db.session.query(serviced).count()
        self.assertEqual(count, 1892)

    def test_made_by_insert_1(self):
        s = made_by(launcher_id=1000000, agency_id=1000000)
        db.session.add(s)
        db.session.commit()

        r = db.session.query(made_by).filter_by(launcher_id = 1000000).one()
        self.assertEqual(r.agency_id, 1000000)
        db.session.query(made_by).filter_by(launcher_id = 1000000).delete()
        db.session.commit()

    def test_made_by_insert_2(self):
        s = made_by(launcher_id=1000001, agency_id=1000001)
        db.session.add(s)
        db.session.commit()


        r = db.session.query(made_by).filter_by(launcher_id = 1000001).one()
        self.assertEqual(r.agency_id, 1000001)
        db.session.query(made_by).filter_by(launcher_id = 1000001).delete()
        db.session.commit()

    def test_made_by_count(self):
        count = db.session.query(made_by).count()
        self.assertEqual(count, 457)

    def test_used_insert_1(self):
        s = used(launch_id='test', launcher_id=1000000)
        db.session.add(s)
        db.session.commit()


        r = db.session.query(used).filter_by(launch_id = 'test').one()
        self.assertEqual(r.launcher_id, 1000000)
        db.session.query(used).filter_by(launch_id = 'test').delete()
        db.session.commit()

    def test_used_insert_2(self):
        s = used(launch_id='test1', launcher_id=1000001)
        db.session.add(s)
        db.session.commit()


        r = db.session.query(used).filter_by(launch_id = 'test1').one()
        self.assertEqual(r.launcher_id, 1000001)
        db.session.query(used).filter_by(launch_id = 'test1').delete()
        db.session.commit()

    def test_used_count(self):
        count = db.session.query(used).count()
        self.assertEqual(count, 1892)

def restore():
    db.session.query(launches).filter_by(launch_id = 'test').delete()
    db.session.commit()
if __name__ == '__main__':
    #restore()
    unittest.main()
# end of code
